const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const messagesRoute = require("./Routes/messagesRoute");

const app = express();

// Enable CORS for Express app
app.use(cors());

app.use(express.json());
let port = process.env.PORT || 8080;

connectToMongo();

// Availbale routes;
app.use('/api/auth',userRoutes);    // router object wiil be replaced by require(...) and  wiill act as a middleware function 
app.use('/api/messages',messagesRoute);


const server = app.listen(port, () => {
    console.log("Server started at " + port);
});




const io = socket(server, {
    cors: {
      origin: "https://mern-chat-app-frontend-khaf.onrender.com",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            const message = {
                id: uuidv4(), // Generate a unique ID for the message
                message: data.message,
            };
            socket.to(sendUserSocket).emit("msg-recieve", message);
        }
    });
});
