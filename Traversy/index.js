import { getPosts } from './postController.js';

console.log("Hello from Traversy index.js");
const {generateRandomNumber,ageCalculator} = require('./utils');
console.log("Random number generated:", generateRandomNumber());
console.log(`I am ${ageCalculator(1998)} years old.`);



console.log(getPosts)
console.log(getPosts()[0].title);  
console.log(getPosts()[1].title);
console.log(getPosts()[2].title);