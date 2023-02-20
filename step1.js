const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile('one.txt', 'utf8', function(err, data) {
        if(err) {
            console.log(err);
        }
        console.log(`${data}`);
    });
}

cat()

try {
    const contents = fs.readFileSync('one.txt', 'utf8');
    console.log(`${contents}`);
} catch (error) {
    console.error(error);
    process.exit(1);
}

