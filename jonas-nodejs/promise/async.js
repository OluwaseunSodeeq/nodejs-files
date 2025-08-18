const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('I could not find that file')
            resolve(data)
        });
    });
}

const writeFIlePro = (file,data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file')
            resolve('File written successfully')
        });
    });
};

const getDogPic = async() => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`BREED OF READ FILE PRO : ${data}`);

        const res1Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); 
        // console.log(res.body.message)
        await writeFIlePro('dog-img.txt', res1Pro.body.message);
        console.log('Random dog image saved to file!');

        // formula for multiple promises
        const res2Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        console.log(all);
        const images =  all .map(each => each.body.message);
        console.log(images.join('\n'));
    }
    catch (err) {
        console.log(err);
        throw new Error('Error occurred while fetching dog picture');
    }
    return 'getDogPic function is Done!';
};

const x = getDogPic();
console.log(x); // This will log a Promise object Pending state
// x.then(res => console.log(res))

// IIFE for catching errors in an async function
(async () => {
    try {
        const y = await getDogPic();
        console.log(y);
    } catch (err) {
        console.log(err.message);
    }
})();

console.log('1: Will get dog pics!'); // This will run before the async function completes
console.log('2: Will get dog pics!'); // This will run before the async function completes

// How to run multiple promises at the same time