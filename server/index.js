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

const server = app.listen(port, () => {
    console.log("Server started at " + port);
});

// Enable CORS for Socket.IO
const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
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
