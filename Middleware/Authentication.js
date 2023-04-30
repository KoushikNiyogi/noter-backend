const express = require("express");
var jwt = require('jsonwebtoken');


const Authentication = (req,res,next)=>{
   let Token = req.headers.authorization;
   if(Token){
    const decode = jwt.verify(Token.split(" ")[1],"masai");
    if(decode){
        req.body.author = decode.author;
        req.body.authorid = decode.authorid;
         next();
    }else{
        res.status(400).send({"msg" : "Please Login again , invalid token!!!"})
    }
   }else{
    res.status(400).send({"msg": "Please Login!!!"})
   }
}

module.exports = {
    Authentication
}