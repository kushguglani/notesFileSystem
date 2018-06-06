const fs = require('fs');

const fetchAllNotes = ()=>{
    try{
        return fs.readFileSync('./Notes/Notes.txt');
    }
    catch(e){
        console.log(`no file exist ${e}`);
    }   
}
const addAllNotes = notes =>{
    fs.writeFileSync('./Notes/Notes.txt',notes)
}

const duplicateNote = (notes,title)=>{
    // add duplicate title notes in var duplicateTitle
    return notes.filter(note=> note.title === title); 
    
}

const addNote = (title,body)=>{
    let notes= fetchAllNotes();
    if(notes){
        notes= JSON.parse(notes);
    } 
    else {
        notes = [];
    }
    const note= {
        title,
        body
    }
    const duplicateTitle = duplicateNote(notes,title);
    if(duplicateTitle.length ===0){
        notes.push(note);
        notes = JSON.stringify(notes);
        addAllNotes(notes);
    }
    return duplicateTitle.length===0?`Note ${title} is Inserted`:`Notes already exist`;
}

const removeNote = (title)=>{
    let notes = fetchAllNotes();
    notes = JSON.parse(notes);

    var noteDelete = notes.filter(note=>{
        if(note.title !== title){
            return note;
        }
    })
    if(noteDelete.length !== notes.length){
        noteDelete = JSON.stringify(noteDelete);
        addAllNotes(noteDelete);
        return `note ${title} is removed`;
    }
    else{
        return `note ${title} doesn't exist`;
    }
}

const fetchNote = ()=>{
    let notes = fetchAllNotes();
    notes = JSON.parse(notes);
    notes.forEach((note,i)=>{
        console.log(`-----------`);
        console.log(++i);
        console.log(`Note title : ${note.title}`);
        console.log(`Note description : ${note.body}`);
    });
    console.log(`-----------`);
}

const updateNote = (title,body)=>{
    let notes = fetchAllNotes();
    notes = JSON.parse(notes);
    const duplicateTitle = duplicateNote(notes,title);
    console.log(duplicateTitle);
    if(duplicateTitle.length ===1){
        var noteDelete = notes.filter(note=>{
            if(note.title !== title){
                return note;
            }
        });
        var note = {
            title,body
        }
        noteDelete.push(note);
        noteDelete = JSON.stringify(noteDelete);
        addAllNotes(noteDelete);
        return `note ${title} updates successfully`;
    }
    else {
        return `note ${title} is not exist`;
    }
}

module.exports ={
    addNote,
    removeNote,
    fetchNote,
    updateNote
}