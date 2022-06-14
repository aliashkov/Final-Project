const router = require('express').Router()
const messagesController = require("../controllers/messagesController");
const Message = require('../models/Message');

// New Message 

router.post("/" , messagesController.newMessage)


// Get Message of user

router.get("/:conversationId" , messagesController.getMessagesById)


// Delete Message of user

router.delete("/:id" , messagesController.deleteMessage)


// Update Message of user

router.put("/:id" , messagesController.updateMessage)


module.exports = router;