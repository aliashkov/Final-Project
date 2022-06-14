const Message = require('../models/Message');
const Conversation = require('../models/Conversation')


const newMessage = async (req, res) => {
    const message = new Message(req.body)
    const conversation = await Conversation.findById(req.body.conversationId)
    console.log(conversation)
    try {
        const savedMessage = await message.save();
        await conversation.updateOne({ $set: { __v: 1}});
        res.status(200).json(savedMessage);;
    } catch (err) {
        res.status(500).json(err);
    }
}

const getMessagesById = async (req, res) => {

    try {
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        const conversation = await Conversation.findById(message.conversationId)
        if ((message.sender === req.body.userId) || req.body.isAdmin) {
            await message.deleteOne();
            await conversation.updateOne({ $set: { __v: 1}});
            res.status(200).json("Message has been deleted");
        } else {
            res.status(403).json("You can delete only your messages");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        const conversation = await Conversation.findById(message.conversationId)
        if ((message.sender === req.body.userId) || req.body.isAdmin) {
            await message.updateOne({ $set: req.body });
            await conversation.updateOne({ $set: { __v: 1}});
            res.status(200).json("Message has been updated");
        } else {
            res.status(403).json("You can update only your messages");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports = {
    newMessage,
    getMessagesById,
    deleteMessage,
    updateMessage
}