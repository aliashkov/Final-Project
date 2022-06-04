const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');


const addComment = async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment)

    } catch (err) {
        res.status(500).json(err)
    }
}

const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json(err);
    }
}





module.exports = {
    addComment,
    getComment
}