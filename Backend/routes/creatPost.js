const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../middlewear/requiredLogin");
const POST = mongoose.model("post");

router.get("/getallPosts", (req, res) => {
  POST.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

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

router.get("/myposts", requiredLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((mypost) => {
      res.json(mypost);
    });
});

// LIKE Api...

router.put("/like", requiredLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    // .exec((err, result) => {
    //     if (err) {
    //         return res.status(422).json({ error: err })
    //     } else {
    //         res.json(result)
    //     }
    // })
    .then((r) => res.status(200).json(r))
    .catch((err) => res.status(422).json({ error: err }));
});

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
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    // .exec((err, result) => {
    //     if (err) {
    //         return res.status(422).json({ error: err })
    //     } else {
    //         res.json(result)
    //     }
    // })
    .then((r) => res.status(200).json(r))
    .catch((err) => res.status(422).json({ error: err }));
});

// comment api here

router.put("/comments", requiredLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };

  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(402), express.json({ error: err });
    });
});

// delete post api

router.delete("/deletePost/:postId", requiredLogin, (req, res) => {
  console.log(req.params.postId);
  POST.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .then((post) => {
      console.log(post.postedBy._id, req.user._id);
      if (post.postedBy._id.toString() == req.user._id.toString()) {
        post
          .deleteOne()
          .then((result) => {
            return res.json({ message: "Post Deleted Successfully" });
          })
          .catch((err) => {
            return res.json({ error: err });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(422).json({ error: err });
    });
});



// following post..


router.get("/myfollows",requiredLogin,(req,res)=>{
  POST.find({postedBy:{$in:req.user.following}})
  .populate("postedBy","_id name")
  .populate("comments.postedBy","_id name")
  .then(posts=>{return res.status(200).json(posts)})
  .catch(err=>res.json({error:err}))
})

module.exports = router;
