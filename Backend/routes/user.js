const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("post");
const USER = mongoose.model("USER");
const requiredLogin = require("../middlewear/requiredLogin");


// to get users Profiles 

router.get("/users/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      console.log(user);
      POST.find({postedBy:req.params.id})
      .populate("postedBy","_id")
      .then(posts=>{res.status(200).json({user,posts})})
    })
    .catch((err) => {
      console.log(err);
    });
});


// to follow users .. 

router.put("/follow",requiredLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user._id}
  },{
    new:true
  },{

   
  })
  .then(result=>{
  
    USER.findByIdAndUpdate(req.user._id,{
      $push:{following:req.body.followId}
    },{
      new:true
    })
    .then(result=>{return res.status(200).json({result})})

    .catch(err=>{return res.status(422).json({error:err})})

  }).catch(err=>{return res.status(422).json({error:err})})
})





router.put("/unfollow",requiredLogin,(req,res)=>{
  USER.findByIdAndUpdate(req.body.followId,{
    $pull:{followers:req.user._id}
  },{
    new:true
  },{

   
  })
  .then(result=>{
  
    USER.findByIdAndUpdate(req.user._id,{
      $pull:{following:req.body.followId}
    },{
      new:true
    })
    .then(result=>{return res.status(200).json({result})})

    .catch(err=>{return res.status(422).json({error:err})})

  }).catch(err=>{return res.status(422).json({error:err})})
})






module.exports = router;
