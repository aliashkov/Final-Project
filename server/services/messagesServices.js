const Message = require('../models/Message');

const newMessage = (newMessage) => {
    return new Message(newMessage)
}


const savedMessage = (message) => {
    return message.save();
}

const getMessagesByConversationId = (conversationId) => {
    return Message.find({
        conversationId: conversationId
    })
}

const getMessage = (messageId) => {
    return Message.findById(messageId);
}

const deleteMessage = (message) => {
    return  message.deleteOne();
}


const updateMessage = (message, body) => {
    return message.updateOne({ $set: body });
}


module.exports = {
    newMessage,
    savedMessage,
    getMessagesByConversationId,
    getMessage,
    deleteMessage,
    updateMessage
}