const http = require('http');
const {PORT} = require('./config/env.js');
const logger = require('./utils/logger');
const fs = require('fs');
const path = require('path');
const { PUBLIC_DIR } = require('./config/env');
const { getContentType } = require('./utils/contentType');

const server = http.createServer((req, res) => {
    const start = Date.now();
    const method = req.method;
    const fullURL = new URL(req.url, `http://${req.headers.host}`);
    const url = fullURL.pathname;
    
    res.on('finish', () => {
    const durationMs = Date.now() - start;

    logger.log(method, url, res.statusCode, durationMs);
    console.log(`Method: ${method}, URL: ${url}, StatusCode: ${res.statusCode}, DurationMs:${durationMs}`);
    });

    let filePath;
    if (url === "/") {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    }
    else if (url === "/about") {
        filePath = path.join(PUBLIC_DIR, 'about.html');
    }
    else {
        filePath = path.join(PUBLIC_DIR, url);
    }
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('Not found');
            return;
        }
    res.statusCode = 200;
    res.setHeader('Content-Type', getContentType(filePath));
    res.end(content);
    });

});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});