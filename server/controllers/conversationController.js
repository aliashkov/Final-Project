const Conversation = require('../models/Conversation');


const newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        let allowAdd = true;
        const conversations = await Conversation.find({});
        await Promise.all(
            conversations.map((member) => {
                if (((member.members[0] === req.body.senderId) && (member.members[1] === req.body.receiverId)) || ((member.members[0] === req.body.receiverId) && (member.members[1] === req.body.senderId)))
                    allowAdd = false;
            })
        );
        if (allowAdd) {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        }
        else{
            res.status(203).json("This conversation alreaty exists");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

const getConversation = async (req, res) => {

    try {
        const conversation = await Conversation.find({
            members: {
                $in: [req.params.userId]
            }
        })
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }

}

module.exports = {
    newConversation,
    getConversation
}