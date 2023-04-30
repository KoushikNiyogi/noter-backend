const express = require("express");
const notesROuter = express.Router();
const {NoteModel} = require("../Models/Note.model")

notesROuter.post("/create", async(req, res) => {
  try {
    let note = new NoteModel(req.body);
    await note.save();
    console.log(req.body)
    res.status(200).send({"msg":"New note has been added"})
  } catch (error) {
    res.status(400).send({"err":error.message})
  }

})

notesROuter.get("/", async(req, res) => {
    
    try {
        let note = await NoteModel.find({authorid: req.body.authorid});
        res.status(200).send({"notes":note})
      } catch (error) {
        res.status(400).send({"err":error.message})
      }

})
notesROuter.delete("/delete/:deleteID",async (req, res) => {
    let {deleteID} = req.params;
    let note = await NoteModel.findOne({_id:deleteID});
    try {
      if(req.body.authorid !== note.authorid){
        res.status(400).send({"err": "You are not authorized to do this operation!!!"})
      }else{
        let note = await NoteModel.findByIdAndDelete({_id:deleteID});
        res.status(200).send({"msg":"Note deleted successfully"})
      }
      } catch (error) {
        res.status(400).send({"err":error.message})
      }

})
notesROuter.patch("/update/:updateID", async(req, res) => {
    let {updateID} = req.params;
    let note = await NoteModel.findOne({_id:updateID});
    try {
      if (req.body.authorid !== note.authorid) {
        res.status(400).send({"err": "You are not authorized to do this operation!!!"})
      } else {
        let note = await NoteModel.findOneAndUpdate({_id:updateID},req.body);
        res.status(200).send({"msg":"Note edited successfully"})
      }  
      } catch (error) {
        res.status(400).send({"err":error.message})
      }

})

module.exports = {
    notesROuter
}