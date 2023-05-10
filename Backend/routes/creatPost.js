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


// LIKE Api...

router.put("/like", requiredLogin, (req, res) => {
  POST.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id }
  }, {
      new: true
  }).populate("postedBy", "_id name Photo")
      // .exec((err, result) => {
      //     if (err) {
      //         return res.status(422).json({ error: err })
      //     } else {
      //         res.json(result)
      //     }
      // })
      .then(r=>res.status(200).json(r))
      .catch(err=>res.status(422).json({error:err}))
      
})

// router.put("/unlikes",requiredLogin,(req,res)=>{
//   POST.findByIdAndUpdate(req.body.postId,{
//     $pull: {likes:req.user._id}
//   },{
//     new:true
//   }).exec((err,result)=>{

//     if(err){
//       return res.status(422).json({error:err})
//     }else{
//        res.json(result);
//     }

//   })
// })


router.put("/unlike", requiredLogin, (req, res) => {
  POST.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
  }, {
      new: true
  }).populate("postedBy", "_id name Photo")
      // .exec((err, result) => {
      //     if (err) {
      //         return res.status(422).json({ error: err })
      //     } else {
      //         res.json(result)
      //     }
      // })
      .then(r=>res.status(200).json(r))
      .catch(err=>res.status(422).json({error:err}))
      
})




module.exports = router;
