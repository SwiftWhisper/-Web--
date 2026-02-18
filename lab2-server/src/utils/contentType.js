const path = require('path');

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();

  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png; charset=utf-8';
    case '.jpg':
      return 'image/jpg; charset=utf-8';
    default:
      return 'text/plain; charset=utf-8';
  }
}

module.exports = { getContentType };
