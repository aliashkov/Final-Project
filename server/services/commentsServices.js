const Comment = require('../models/Comment');

const commentsAdded = (post, friend) => {
    return post.updateOne({ $push: { comments: friend } });
}

const commentsDeleted = (post, friend) => {
    return post.updateOne({ $pull: { comments: friend } });
}

const findCommentsById = (id) => {
    return Comment.find({ 'postId': id });
}

const newComment = (newComment) => {
    return new Comment(newComment)
}

const savedComment = (newComment) => {
    return newComment.save();
}

const findComment = (id) => {
    return Comment.findById(id)
}

const likeComment = (comment, userId) => {
    return comment.updateOne({ $push: { likes: userId } });
}

const dislikeComment = (comment , userId) => {
    return comment.updateOne({ $pull: { likes: userId } });
}

const deleteComment = (comment) => {
    return comment.deleteOne();
}

const updateCommentAdmin = (comment, desc) => {
    return comment.updateOne({ $set: { description: desc} });
}

const updateCommentUser = (comment, body) => {
    return comment.updateOne({ $set: body });
}

const deleteCommentsByUser = (id) => {
    return Comment.deleteMany({ userId : id });
}


module.exports = {
    commentsAdded,
    commentsDeleted,
    findCommentsById,
    newComment,
    savedComment,
    findComment,
    likeComment,
    dislikeComment,
    deleteComment,
    updateCommentAdmin,
    updateCommentUser,
    deleteCommentsByUser
}