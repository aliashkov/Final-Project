const router = require('express').Router()
const conversationController = require("../controllers/conversationController");
const Conversation = require('../models/Conversation');

// New Conversation 

router.post("/" , conversationController.newConversation)


// Get Conversation of user

router.get("/:userId" , conversationController.getConversation)


router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;