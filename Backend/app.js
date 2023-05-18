const express = require("express");
const app = express();
const mongoose = require("mongoose")
const {MDulr} = require("./keys")
const cors = require("cors")
const PORT = process.env.port|| 5000;
const path = require("path")
app.use(express.json());

app.use(cors());

require("./models/model");
require("./models/post");

app.use(require("./routes/auth"))
app.use(require("./routes/creatPost"))
app.use(require("./routes/user"))



mongoose.connect(MDulr);

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected ");

})


mongoose.connection.on("error",()=>{
    console.log( "mongodb not  connected ");

})


// serving the frontend 


app.use(express.static(path.join(__dirname,"./Frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Frontend/build/index.html"),
    function(err){
        res.status(500).send(err);
    }
    )
})




app.listen(PORT,()=>{
    console.log("server runing at port" + PORT);
})