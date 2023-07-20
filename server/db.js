const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGO_URL; // connection string

const  connectToMongo= async()=>{
   await mongoose.connect(mongoUri).then(()=>{
    console.log(" Database connected succesfully");
   }).catch((err)=>{
       console.error("Db could not connect due to " + err);
   })
   
}

module.exports=connectToMongo;  // m.e
