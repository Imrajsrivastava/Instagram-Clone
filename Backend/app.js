const express = require("express");
const app = express();
const mongoose = require("mongoose")
const {MDulr} = require("./keys")
const cors = require("cors")
const PORT = 5000;
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

app.listen(PORT,()=>{
    console.log("server runing at port" + PORT);
})