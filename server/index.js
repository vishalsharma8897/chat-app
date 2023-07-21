const connectToMongo= require("./db");// imported connectToMongo for connection 
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes= require("./Routes/userRoutes");


const app = express();
app.use(cors());
app.use(express.json());


let port = process.env.PORT || 8080;
connectToMongo();  // connected 

// Availbale routes;
app.use('/api/auth',userRoutes);    // router object wiil be replaced by require(...) and  wiill act as a middleware function 



app.listen(port,()=>{
    console.log("Server started at " + port);
})