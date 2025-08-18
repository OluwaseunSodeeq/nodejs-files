const fs  = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // solution1 (for small files)
    fs.readFile('test-file-small.txt', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error reading file');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        console.log('File read successfully');
        res.end(data);
    });
    // Second solution (for big files)
    readable = fs.createReadStream('test-file-large.txt');

    // File not found! for the below
    // readable = fs.createReadStream('test-file-largeee.txt');
    readable.on('data', (chunk) => {
        res.write(chunk);
    });
    readable.on('end', () => {
        res.end();
    });
    readable.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File not found!');
    });

    // Solution 3 (The best Solution)
    const readableStream = fs.createStream("text-file-large.txt");
    readableStream.pipe(res);
    
});
server.listen(8000, "127.0.0.1",() => {
    console.log('Server is listening on port 8000');
});
