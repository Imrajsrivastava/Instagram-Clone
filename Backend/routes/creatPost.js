const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../middlewear/requiredLogin");
const POST = mongoose.model("post");


router.post("/creatPost",requiredLogin,(req,res)=>{
    const {title,body} = req.body;

    if(!title || ! body){
        return res.status(422).json({error:"required all fileds"})
    }
    req.user
    console.log(req.user)
    // res.json("ok")
    const post = new POST({
        title,
        body,
        postedBy:req.user

    })
    post.save().then((result)=>{
        return res.json({post:result})
    }).catch((err)=>{
        console.log(err)
    })
    
})


module.exports= router;