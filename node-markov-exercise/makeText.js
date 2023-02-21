/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

// Creates an instance of MarkovMachine from input text and outputs new text from it

// line 14: declares the function, "generateText()"
// line 15: defines variable "mm" as a new instance of MarkovMachine made from the input text
// line 16: calls the makeText() method on "mm" and logs it to the console

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// Reads and generates text from an input file 

// line 29: delares the function, "makeText()"
// line 30: reads the file from input file path through callback function
// line 31: if the file can't be read...
// line 32: ...log the path and the error to the console
// line 33: kill the current processes
// line 34: ...if the file can be read...
// line 35: call generateText() on the data from the file

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    })
}

// Reads and generates text from a url 

// line 51: declares async function makeURLText()
// line 52: defines "resp" variable for later use
// lines 53 & 54: try to get data from the input url via axios
// line 55: if the data cannot be read
// line 56: log the url and error to the console
// line 57: kill the current processes
// line 58: if the file can be read...
// line 59: call generateText() on the response data from the url

async function makeURLText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}

// Interpret command line to decide what to do

// line 75: slices the elements at indexes [2] & [3] in process.argv array and 
//      copies them into a new array with index[0] being the method to be used 
//      and index[1] being the path to read 
// line 76: if "method" is equal to "file"...
// line 77: ...then call the makeText() method on "path"
// line 78: if "method" is equal to "url"...
// line 79: ...then call the makeURLText() method on "path"
// line 80: if the method cannot be determined...
// line 81: log the method and error to the console
// line 82: kill the current processes

let [method, path] = process.argv.slice(2);
if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
