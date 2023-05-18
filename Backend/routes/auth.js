const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwt_secret} = require("../keys");






// router.get("/", (req, res) => {
//   res.send("jai sri ram");
// });

router.post("/signup", (req, res) => {
  //  console.log( req.body.name);
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(404).json({ error: "required all input field" });
  }

  USER.findOne({ $or: [{ email: email }, { username: username }] }).then(
    (saveuser) => {
      // console.log(saveuser);
      if (saveuser) {
        return res.status(422).json({ error: "user already exist" });
      }

      bcrypt.hash(password, 12).then((hashedpassword) => {
        
        const user = new USER({
          name,
          username,
          email,
          password: hashedpassword,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "SignUp Successfully " });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Required all fileds" });
  }
  USER.findOne({ email: email }).then((userlog) => {
    if (!userlog) {
      return res.status(422).json({ error: "wrong gmail" });
    }

    bcrypt
      .compare(password, userlog.password)
      .then((match) => {
        if (match) {
          // return res.status(200).json({ message: "Signed in Successfully" });
          const token = jwt.sign({_id: userlog.id}, jwt_secret);

          console.log(token);
          // console.log(userlog.id);
          const {_id,name,gmail,username}=userlog
          
          console.log({token,user:{_id,name,gmail,username}})

          return res.json({token,user:{_id,name,gmail,username}});


        } else {
          return res.status(422).json({ error: "invailid password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
