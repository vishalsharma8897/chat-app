const { addMessage, getAllMessages } = require("../controllers/messagesController");
const router = require('express').Router();

router.post("/addmsg",addMessage)
router.post("/getAllMessages",getAllMessages)

module.exports= router;