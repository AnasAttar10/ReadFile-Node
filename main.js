const csv = require('csv-parser')
const fs = require("fs");


const _users = [] 

const  readCsv = function(filePath ){
    return new Promise( (res , rej )=>{
        fs.createReadStream(filePath)
        .pipe(csv({}))
        .on("data" , (user)=>{
            _users.push(user) 
        })
        .on("end" , ()=>{
            console.log(`CSV file ${filePath} read successfully`);
            res(_users)
    
        })
        .on("error" , (err)=>{
            rej(`Error reading CSV file ${filePath}: ${err}`)
        })
    })
    
}

const saveToFile = function (filePath , data ){
    return new Promise( (res , rej )=>{
        fs.writeFile(filePath ,JSON.stringify(data) ,(err)=>{
            if(err){
                rej(`Error saving to file ${filePath}: ${err}`)
            }
            console.log(`Data saved to file ${filePath}`);
            res();
        })
    })

}

const readJsonFile = function (filePath){
    return new Promise((res , rej )=>{
        fs.readFile(filePath , (err , content)=>{
            if(err){
                rej(`Error reading from file ${filePath}: ${err}`);
            }
            try {
                const jsonData = JSON.parse(content);
                res(jsonData);
            } catch (err) {
                rej(`Error parsing JSON from file ${filePath}:${err}`);
            }
        })
    })
}
const main = async function(){
    await readCsv("users.csv")
    await saveToFile('users.json' , _users)
    readJsonFile('users.json')
}

main()


