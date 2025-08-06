const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require("./modules/replaceTemplate.js");

// Synchronous file reads at the top level
const data = fs.readFileSync(`${__dirname}/node-farm/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

// Imported Template replacement function



// HTML templates (also read synchronously)
const tempOverview = fs.readFileSync(`${__dirname}/node-farm/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/node-farm/templates/product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/node-farm/templates/card.html`, 'utf-8');



// Server
const server = http.createServer((req, res) => {
    // const pathName = req.url;
    const {pathname,query} = url.parse(req.url, true);

    // OVERVIEW PAGE
    if (pathname === "/" || pathname === '/overview') {
        res.writeHead(200, { "Content-type": "text/html" });

        // Join method converts array to string
        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        res.end(output);
    }

    // PRODUCT PAGE
    else if (pathname === '/product') {
        const product = dataObject[query.id];
        // console.log("Requested product ID:", query.id);

        if (!product) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("<h1>Product not found</h1>");
        }

        res.writeHead(200, { "Content-type": "text/html" });
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
 }

    // API PAGE
    else if (pathname === '/api') {
        console.log("This is the API page.");
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    }

    // NOT FOUND
    else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        });
        res.end("<h1>Page not found!</h1>");
    }
});

// Start server
server.listen(8000, '127.0.0.1', () => {
    console.log("Server is running on port 8000");
});
