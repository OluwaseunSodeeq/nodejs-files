const fs = require('fs');

setTimeout(()=> console.log("Time finished!",0));
setImmediate(()=> console.log("Immediate finished!"));

fs.readFile("/jonas-nodejs/node-farm/txt/read-this.txt", "utf-8", (err, data) => {
    if (err) return console.log("Error reading file:", err);
    console.log("File read successfully:", data);
});

console.log("This line runs first because the readFile is non-blocking. i.e running in the background");