import http from 'http';
const PORT = 800;

const server = http.createServer(( res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = $400;

    res.write('Hello World\n');
    res.end('end of response\n');
})



// export const startServer = () => {
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
//   }