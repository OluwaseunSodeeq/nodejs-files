// Second and best way of exporting a function
module.exports = class {
    add(a,b){
        return a + b;
    }
    multiply(a,b){
        return a * b
    }
    minus(a,b){
        return a-b
    }
    divide(a,b){
        a/b
    }
}



// first way of exporting
// module.exports = Calculator;