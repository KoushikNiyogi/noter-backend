const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
    title : {type:String,required:true},
    body : {type:String,required:true},
    author : {type:String,required:true},
    authorid : {type:String,required:true},
    category : {type:String,required:true}
})

const NoteModel = mongoose.model("Notes", noteSchema);

module.exports = {NoteModel}