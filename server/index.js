const connectToMongo= require("./db");// imported connectToMongo for connection 
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const userRoutes= require("./Routes/userRoutes");
const messagesRoute= require("./Routes/messagesRoute");


const app = express();
const allowedOrigins = ['https://mern-chat-front.onrender.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Enable CORS for all routes
app.use(cors(corsOptions));
app.use(express.json());


let port = process.env.PORT || 8080;
connectToMongo();  // connected 

// Availbale routes;
app.use('/api/auth',userRoutes);    // router object wiil be replaced by require(...) and  wiill act as a middleware function 
app.use('/api/messages',messagesRoute);    // router object wiil be replaced by require(...) and  wiill act as a middleware function 



const server = app.listen(port,()=>{
    console.log("Server started at " + port);
})

 const io = socket(server,{
    cors:{
        origin:"https://mern-chat-front-khen.onrender.com",
        credentials:true,
    }
 })

 global.onlineUsers= new Map();

 io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket= onlineUsers.get(data.to);
        if(sendUserSocket){
            const message = {
                id: uuidv4(), // Generate a unique ID for the message
                message: data.message,
              };
            socket.to(sendUserSocket).emit("msg-recieve",message);
        }
    });
 });