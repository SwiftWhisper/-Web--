const fs = require('fs');
const path = require('path');
const { LOG_PATH } = require('../config/env');

const dir = path.dirname(LOG_PATH);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

function log(method, url, statusCode, durationMs) {
  const time = new Date().toISOString();
  const logObj = {
    time: new Date().toISOString(),
    method,
    url,
    statusCode,
    durationMs
  };
  line = JSON.stringify(logObj) + '\n';

  fs.appendFile(LOG_PATH, line, (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });
}

module.exports = { log };
