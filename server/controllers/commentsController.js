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


const likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment.likes.includes(req.body.userId)) {
            await comment.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Comment has been liked");
        } else {
            await comment.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Comment has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.body.userId) {
            await comment.deleteOne();
            res.status(200).json("Comment has been deleted");
        } else {
            res.status(403).json("You can delete only your comment");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.userId === req.body.userId) {
            await comment.updateOne({ $set: req.body });
            res.status(200).json("Comment has been updated");
        } else {
            res.status(403).json("You can update only your comment");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}





module.exports = {
    addComment,
    getComment,
    likeComment,
    deleteComment,
    updateComment
}