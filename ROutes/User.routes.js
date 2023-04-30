const express = require("express")
const {UserModel} = require("../Models/User.models")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRouter = express.Router();

UserRouter.post("/register",async (req,res)=>{
  let {email,password,name,age} = req.body
  let check = await UserModel.findOne({email});
  console.log(check);
  if(check == null){
    try {
      bcrypt.hash(password, 5,async function(err, hash) {
        // Store hash in your password DB.
        if(err){
          res.status(400).send("Wrong credentials");
        }else{
          const user = new UserModel({name,age,email,password:hash});
          await user.save();
          res.status(200).send({"msg":"New user has been added"})
        }
    });
      
     } catch (error) {
       res.status(400).send({"err":"Something is wrong"})
     }
  }else{
    res.status(200).send({"msg": "User alredy exists.Please login!!!"})
  }
   
})

UserRouter.post("/login",async (req,res)=>{
   let{email,password} = req.body;
   try {
    const user = await UserModel.findOne({email})
    if(user){
      bcrypt.compare(password, user.password, async function(err, result) {
        // result == true
        console.log(result);
        if(result){
          var token = jwt.sign({ author: user.name,authorid : user["_id"] }, 'masai');
           res.status(200).send({msg:"Login successful!!!","token":token})
        }else{
          res.send({"msg" : "Wrong password!!!"})
        }
    });
    }else{
      res.send({"msg":"Please Register to Login!!!"})
    }
   } catch (error) {
      res.status(200).send({error : error.msg})
   }
})

module.exports = {UserRouter}