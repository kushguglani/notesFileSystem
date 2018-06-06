// node import
const express = require('express');
const fs = require('fs');
const yargs = require('yargs');

const notesFile = require('./notesFunction/notes');

// deafult variable
const port = 90;
const app = express();
const argv = yargs.argv;

if(argv._[0] === "add" ){
    let note = notesFile.addNote(argv.title,argv.body);
    console.log(note);
}
else if(argv._[0] ==="remove"){
    let note = notesFile.removeNote(argv.title);
    console.log(note);
}
else if(argv._[0] === "fetch") {
    notesFile.fetchNote();
}
else if(argv._[0] === "update") {
    let msz = notesFile.updateNote(argv.title,argv.body);
    console.log(msz);
}

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
})