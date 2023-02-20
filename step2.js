const fs = require('fs');
const process = require('process');
const axios = require('axios')

function cat(path) {
    fs.readFile('one.txt', 'utf8', function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log(`${data}`);
    });
}


async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


let path = process.argv[2]

if (path.slice(0,4) !== 'http') {
    cat(path)
} 
else {
    webCat(path)
}

    



