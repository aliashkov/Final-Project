const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

const newPost = (newPost) => {
    return new Post(newPost)
}

const savePost = (newPost) => {
    return newPost.save();
}

const findPostById = (postId) => {
    return Post.findById(postId);
}

const updatePostAdmin = (post, desc, img) => {
    return post.updateOne({ $set: { description: desc, img: img } });
}

const updatePostUser = (post, body) => {
    return post.updateOne({ $set: body });
}

const deletePost = (post) => {
    return post.deleteOne();
}

const likePost = (post, userId) => {
    return post.updateOne({ $push: { likes: userId } });
}

const dislikePost = (post, userId) => {
    return post.updateOne({ $pull: { likes: userId } });
}

const findPostsByUserId = (currentUserId) => {
    return Post.find({ userId: currentUserId });
}


const findPostByFriendId = (friendId) => {
    return Post.find({ userId: friendId });
}

const findAllPosts = () => {
    return Post.find({});
}

const deletePostsByUser = (id) => {
    return Post.deleteMany({ userId : id });
}



module.exports = {
    newPost,
    savePost,
    findPostById,
    updatePostAdmin,
    updatePostUser,
    deletePost,
    likePost,
    dislikePost,
    findPostsByUserId,
    findPostByFriendId,
    findAllPosts,
    deletePostsByUser
}