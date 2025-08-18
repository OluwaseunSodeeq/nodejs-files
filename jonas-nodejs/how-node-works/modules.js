// console.log(arguments)
// console.log(require("module").wrapper);


// module.exports
const Cal = require("./cal1-mudules");
const cal1 =  new Cal();
console.log(cal1.multiply(3,5))

// exports
const {addit,multiplyit,divideit} = require("./cal2-modules");
console.log(addit(10,15))
console.log(multiplyit(100,10))