const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');


const addPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)

    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if ((post.userId === req.body.userId) || req.body.isAdmin) {
            if (req.body.isAdmin) {
                await post.updateOne({ $set: { description: req.body.description , img: req.body.img }});
            } else {
                await post.updateOne({ $set: req.body });
            }
           
            res.status(200).json("Post has been updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if ((post.userId === req.body.userId) || req.body.isAdmin) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.comments[0].id.includes(req.body.userId)) {
            const friend = {"id": req.body.userId, "post": req.params.id};
            await post.updateOne({ $push: { comments: friend } });
            res.status(200).json("Comments added");
        } else {
            const friend = {"id": req.body.userId, "post": req.params.id};
            await post.updateOne({ $pull: { comments: friend} });
            res.status(200).json("Comments deleted");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const getAllCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({'postId' : req.params.id});
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
}




const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
}

const getTimelinedPosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.friends.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
}

const getTimelinedPostsAll = async (req, res) => {
    try {
        //const user = await User.find({});
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}


const getAllPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    addPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getTimelinedPosts,
    getTimelinedPostsAll,
    getAllPosts,
    addComment,
    getAllCommentsByPostId
}