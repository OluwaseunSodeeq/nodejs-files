const fs = require('fs');
const crypto =  require("crypto")

const start = Date.now()

setTimeout(()=> console.log("Time finished!",0));
setImmediate(()=> console.log("Immediate finished!"));

fs.readFile("test-file.txt", "utf-8", (err, data) => {
    if (err) return console.log("Error reading file:", err);
    
    setTimeout(() => console.log("Timer 2 finished") ,0)
    setTimeout(()=> console.log("Timer 3 finished"),3000)
    setTimeout(() => console.log("Timer 2 without Time given!!!"))
    process.nextTick(() => console.log("Process nextTick runs before any callback"))
    console.log("---------------");
    console.log("File read successfully: \n", data);
    console.log("---------------");

    // HEAVY TAsks
    crypto.pbkdf2("password","salt",100000,1024,"sha512", () =>{
        console.log("Password encrypted", Date.now() - start)
    } )

    


});

console.log("This line runs first because the readFile is non-blocking. i.e running in the background");