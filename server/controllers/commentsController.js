const commentsServices = require('../services/commentsServices');

const addComment = async (req, res) => {
    const newComment = await commentsServices.newComment(req.body)
    try {
        const savedComment = await commentsServices.savedComment(newComment)
        res.status(200).json(savedComment)

    } catch (err) {
        res.status(500).json(err)
    }
}

const getComment = async (req, res) => {
    try {
        const comment = await commentsServices.findComment(req.params.id)
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json(err);
    }
}


const likeComment = async (req, res) => {
    try {
        const comment = await commentsServices.findComment(req.params.id)
        if (!comment.likes.includes(req.body.userId)) {
            await commentsServices.likeComment(comment, req.body.userId)
            res.status(200).json("Comment has been liked");
        } else {
            await commentsServices.dislikeComment(comment, req.body.userId)
            res.status(200).json("Comment has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const deleteComment = async (req, res) => {
    try {
        const comment = await commentsServices.findComment(req.params.id)
        if ((comment.userId === req.body.userId) || req.body.isAdmin) {
            await commentsServices.deleteComment(comment)
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
        const comment = await commentsServices.findComment(req.params.id)
        if ((comment.userId === req.body.userId) || req.body.isAdmin) {
            if (req.body.isAdmin) {
                await commentsServices.updateCommentAdmin(comment , req.body.description)
            } else {
                await commentsServices.updateCommentUser(comment , req.body)
            }

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