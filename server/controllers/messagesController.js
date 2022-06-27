const messagesServices = require('../services/messagesServices');
const conversationServices = require('../services/conversationServices');


const newMessage = async (req, res) => {
    const message = await messagesServices.newMessage(req.body)
    const conversation = await conversationServices.findByConversationId(req.body.conversationId)
     
    console.log(conversation)
    try {
        const savedMessage = await messagesServices.savedMessage(message) 
        await conversationServices.updateTime(conversation)
        res.status(200).json(savedMessage);;
    } catch (err) {
        res.status(500).json(err);
    }
}

const getMessagesById = async (req, res) => {

    try {
        const messages = await messagesServices.getMessagesByConversationId(req.params.conversationId) 
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteMessage = async (req, res) => {
    try {
        const message = await messagesServices.getMessage(req.params.id) 
        const conversation = await conversationServices.findByConversationId(message.conversationId)
        if ((message.sender === req.body.userId) || req.body.isAdmin) {
            await messagesServices.deleteMessage(message) 
            await conversationServices.updateTime(conversation)
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
        const message = await messagesServices.getMessage(req.params.id) 
        const conversation = await conversationServices.findByConversationId(message.conversationId)
        if ((message.sender === req.body.userId) || req.body.isAdmin) {
            await messagesServices.updateMessage(message, req.body) 
            await conversationServices.updateTime(conversation)
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