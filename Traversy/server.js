import http from 'http';
const server = http.createServer((req, res) => {
  res.write('Hello Server');
  res.end('Hello World\n');
})

server.listen(800, () => {
    console.log('Server is running on port 800');
})