const eventEmitter = require('events');
const http = require('http');


const myEmitter = new eventEmitter();



myEmitter.on ("newSale", () => {
console.log("A new sale was made!");                
});

myEmitter.on ("newSale", () => {
console.log("Customer name: Oluwaseun");                
});

myEmitter.on("newSale",() => {
    console.log("there was new sale 3!")
});
myEmitter.emit("newSale");

// =================================
// Class Inheritance
// =================================
class Sale extends eventEmitter {
    constructor() {
        super();
    }
}

// =================================
// CReating a Server
// =================================

const server =  http.createServer();
server.on("request", (req, res) => {
    console.log("Request received!");
    res.end("Request received!");
});
server.on("request",(req,res) => {
    console.log("Another Request received!");
    res.end("Request received!");
});
server.on("close", () => {
    console.log("Server closed!");
});

server.listen(8000,"127.0.0.1", () => {
    console.log("Waiting for requests...");
});