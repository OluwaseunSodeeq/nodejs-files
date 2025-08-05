const fs = require('fs');
const http = require('http');
// const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;

    if (pathName === "/" || pathName === '/overview') {
       console.log("This is the overview page.");
       res.end("This is the overview page.!");

    }
    else if (pathName === '/product') {
        console.log("This is the product page.");
        res.end("This is the product page!");
    }
    else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        })
        res.end("<h1>Page not found!</h1>");
    }

});
server.listen(8000, '127.0.0.1', () => {
    console.log("Server is running on port 8000");
});