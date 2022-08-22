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

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}\\dog.txt`); //
        console.log(`Breed: ${data}`);
     
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
     
        await writeFilePro(`${__dirname}\\dog-img.txt`, res.body.message);
        console.log("Dog image saved!");

    } catch (err){
        console.log(err);
        throw(err);
    }
    return '2: Ready, man!'
}

//Using then method to get the async function return:
// console.log('1: It will get the Dog pic');
// getDogPic()
// .then(x=>{
//     console.log(x);
//     console.log('3: Done!🤘🏾');
// })
// .catch(err=>{
//     console.log('ERROR!💥');
// });


//Using async/await method to get the async function return:
(async()=>{
try {
    console.log('1: It will get the Dog pic');
    const pic = await getDogPic();
    console.log(pic);
    console.log('3: Done!🤘🏾');

} catch(err){
    console.log('ERROR!💥');
}    
})();

