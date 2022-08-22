const fs = require('fs');
const superagent = require('superagent');

// Promisify readFile - parameters are file path/name

const readFilePro = file=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(file, (err, data)=>{
            if (err) reject('File not found my dude 😥!');
            resolve(data);
        });
    });
} 

// Promisify writeFile - (parameters are file path/name and data which it will be written)
const writeFilePro = (file, data)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, data, err=>{
            if(err) reject('Shit! What the fuck happend?');
            resolve('That\'s it!')
        })
    })
}
    
readFilePro(`${__dirname}\\dog.txt`).then(data =>{
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
    .then(res=>{
        console.log(res.body.message);
        return writeFilePro(`${__dirname}\\dog-img.txt`, res.body.message)
    })  
    .then(()=>{
        console.log("Dog image saved!");
    })
    .catch(err=>{
        console.log(err);
    })
