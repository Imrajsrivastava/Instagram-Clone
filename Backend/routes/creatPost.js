const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../middlewear/requiredLogin");
const POST = mongoose.model("post");



router.get("/getallPosts",(req,res)=>{
  POST.find()
  .populate("postedBy","_id name")
  .then(data=>res.json(data))
  .catch(err=>console.log(err))
   
   
  
})


router.post("/creatPost", requiredLogin, (req, res) => {
  const { body, pic } = req.body;

  if (!body || !pic) {
    return res.status(422).json({ error: "required all fileds" });
  }
  req.user;
  console.log(req.user);
  // res.json("ok")
  const post = new POST({
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});



// mypost show api  

router.get("/myposts",requiredLogin,(req,res)=>{
  POST.find({postedBy:req.user._id})
  .populate("postedBy","_id name")
  .then(mypost=>{
    res.json(mypost)
  })
})

module.exports = router;
