
// fs means "file system" in Node.js, which is a built-in module that allows you to interact with the file system on your computer. It provides methods to read, write, and manipulate files and directories.
const fs  = require('fs');


// Blocking codes (Synchronous)
const hello =  "hello world"
console.log(hello);


const textIn = fs.readFileSync("./1-node-farm/starter/txt/input.txt",  "utf-8");
console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./1-node-farm/starter/txt/output.txt", textOut);
console.log("File written successfully!");

// Non-blocking codes ( Asynchronous)
fs.readFile("./node-farm/starter/txt/start.txt", "utf-8", (err, data) => {
    fs.readFile(`./node-farm/starter/txt/${data}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        fs.readFile("./node-farm/starter/txt/append.txt", "utf-8", (err, data3) => {
            const textOut = `This is what we know about the avocado: ${data2}.\nCreated on ${Date.now()}`;
            fs.writeFile("./node-farm/starter/txt/output.txt", textOut, (err) => {
                console.log("File written successfully!");
            });
        });
    });
    if (err) return console.log("Error reading file:", err);
    // console.log("here is the output:",data);
});
console.log("This line runs first because the about code is non-blocking. i.e running in the background");