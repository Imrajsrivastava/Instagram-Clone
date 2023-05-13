const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("post");
const USER = mongoose.model("USER");

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

module.exports = router;
