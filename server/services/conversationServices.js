const Conversation = require('../models/Conversation');

const newConversation = (senderId, receiverId) => {
    return new Conversation({
        members: [senderId, receiverId],
    });

}

const findConversations = () => {
    return Conversation.find({});
}

const savedConversation = (newConversation) => {
    return newConversation.save();
}

const findConversationById = (userId) => {
    return Conversation.find({
        members: {
            $in: [userId]
        }
    })
}

const findByConversationId = (conversationId) => {
    return Conversation.findById(conversationId)
}

const updateTime = (conversation) => {
    return conversation.updateOne({ $set: { __v: 1}});
}


module.exports = {
    newConversation,
    findConversations,
    savedConversation,
    findConversationById,
    findByConversationId,
    updateTime
}