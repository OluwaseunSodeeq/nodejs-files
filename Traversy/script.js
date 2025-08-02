import http from 'http';
import { console } from 'inspector';
const PORT = process.env.PORT;
import url from 'url';
import fs from 'fs/promises';
import path from 'path';


// Get current Path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current Directory:', __dirname);
console.log('Current File:', __filename);

const server = http.createServer(async( req, res) => {
    // res.write('Hello World\n');
    // res.setHeader('Content-Type', 'text/html');
    // res.statusCode = 404;

    // res.end('end of response\n');
    try{

        if (req.method === 'GET') {
            console.log('Request Method:', req.method);
            let filePath;
               if (req.url === '/') {
                //   res.writeHead(200, { 'Content-Type': 'text/html' });
                  filePath = path.join(__dirname, 'index.html');

                //    res.end('<h1> Hello Oluwaseun, this ia an HomePage</h1>');

                }else if (req.url === '/about') {
                    // res.writeHead(200, { 'Content-Type': 'text/html' });
                    // res.end('<h1> Hello Oluwaseun, this is an About Page</h1>');
                  filePath = path.join(__dirname, 'about.html');

                }else if (req.url === '/contact') {
                    // res.writeHead(200, { 'Content-Type': 'text/html' });
                    // res.end('<h1> Hello Oluwaseun, this is an Contact Page</h1>'); 
                  filePath = path.join(__dirname, 'contact.html');

                }else {
                    // res.writeHead(404, { 'Content-Type': 'text/html' });
                    // res.end('<h1> Hello Oluwaseun, this is an 404 Page</h1>');
                    throw new Error('Page not found');
                }
                const data =  await fs.readFile(filePath);
        }  else {
            console.log('Request Method:', req.method);
            res.setHeader('Content-Type', 'text/html');
            res.write(data)
            res.end();
res.end()

        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }

    // console.log(req.url)
    // console.log(req.method)

    // res.writeHead(500, { 'Content-Type': 'application/json' });
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.statusCode =  404;
    // res.end('<h1> Hello Oluwaseun</h1>');
    // res.end(JSON.stringify({ message: 'Hello World' }));
})



// export const startServer = () => {
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
//   }