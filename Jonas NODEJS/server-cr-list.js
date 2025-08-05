// const fs =  require('fs');
const http = require('http');
const port = 8000;

// Create a server
const server  =  http.createServer((req, res) => {
    console.log(req);
    res.end("Hello from the server!");
})
// console.log("Waiting for requests...");
// console.log(`Server is running on port ${port}`,server);

server.listen(port,"127.0.0.1", () =>{
    console.log(`Server is listening on port ${port}`);
})

