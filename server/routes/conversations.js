const router = require('express').Router()
const conversationController = require("../controllers/conversationController");
const Conversation = require('../models/Conversation');

// New Conversation 

router.post("/" , conversationController.newConversation)


// Get Conversation of user

router.get("/:userId" , conversationController.getConversation)

module.exports = router;