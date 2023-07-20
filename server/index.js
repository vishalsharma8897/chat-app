const connectToMongo= require("./db");// imported connectToMongo for connection 
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


let port = process.env.PORT || 8080;
connectToMongo();  // connected 

// // Availbale routes;
// app.use('/api/auth',require('./routes/auth'));    // router object wiil be replaced by require(...) and  wiill act as a middleware function 
// app.use('/api/notes',require('./routes/notes'));



app.listen(port,()=>{
    console.log("Server started at " + port);
})