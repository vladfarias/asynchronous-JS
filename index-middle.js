const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}\\dog.txt`,'utf-8', (err, data)=>{
    console.log(`Breed: ${data}`);
    superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res=>{
        console.log(res.body.message);
        fs.writeFile(`${__dirname}\\dog-img.txt`, res.body.message, err=>{
            if(err) return console.log(err.message);
            console.log("Dog image saved!");
        })

    })
    .catch(err=>{
        console.log(err.message);
    })

})