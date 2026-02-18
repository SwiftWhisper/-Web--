const http = require('http')

const PORT = 4000

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();

    console.log(`Time: ${time}, Method: ${method}, URL: ${url}`);
    
    if (url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("Home page");
    }
    else if (url === "/about") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("About page");
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("404 Not Found");
    }

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});