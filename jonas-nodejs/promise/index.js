// REad the file
const fs = require('fs')
const superagent = require('superagent')


// Using Promises to read a file and fetch data from an API
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

readFilePro(`${__dirname}/dog.txt`)
   .then(data => {
        console.log(`BREED OF READ FILE PRO : ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
   .then(res => {

        console.log(`READ FILE PRO: Random dog image saved to file! ${res.body.message}` )
        return writeFIlePro('dog-img.txt', res.body.message)
        })
    .then(() =>{
        console.log('File written successfully')
    }).catch(err => {
        console.log(err.message)
    });



// READ THE CONTENT OF THE FILE
fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
    // if (err) return console.log(`Error message: ${err}`) //null
    console.log(`BREED: ${data}`)
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then((err, res) => {
        console.log(res.body.message) //null, {message: 'https://images.dog.ceo/breeds/akita/Akita_inu.jpg', status: 'success'}
        fs.writeFile('dog-img.txt', res.body.message, err => {
            console.log(err) //null
            console.log('Random dog image saved to file!')
        });
    }).catch(err => {
        console.log(err.message) //No route found for "GET http://dog.ceo/api/breeds/retriever/images/random" with code: 0
    });
})