const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8086;
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
    } else {
      const ext = path.extname(filePath);
      let mime = 'text/plain';
      if (ext === '.html') mime = 'text/html; charset=utf-8';
      else if (ext === '.js') mime = 'application/javascript; charset=utf-8';
      else if (ext === '.css') mime = 'text/css; charset=utf-8';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    }
  });
});

// Dual stack listen (supports both IPv4 127.0.0.1 and IPv6 ::1 for localhost)
server.listen(PORT, () => {
  console.log(`AR Sumo Server running at http://localhost:${PORT}/ and http://127.0.0.1:${PORT}/ and http://192.168.151.57:${PORT}/`);
});
