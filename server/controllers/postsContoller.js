const postsServices = require('../services/postsServices');
const userServices = require('../services/userServices');
const commentsServices = require('../services/commentsServices');

const addPost = async (req, res) => {
    const newPost = await postsServices.newPost(req.body)
    try {
        const savedPost = await postsServices.savePost(newPost)
        res.status(200).json(savedPost)

    } catch (err) {
        res.status(500).json(err)
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await postsServices.findPostById(req.params.id)
        if ((post.userId === req.body.userId) || req.body.isAdmin) {
            if (req.body.isAdmin) {
                await postsServices.updatePostAdmin(post, req.body.description, req.body.img)
            } else {
                await postsServices.updatePostUser(post, req.body)
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
        const post = await postsServices.findPostById(req.params.id)
        if ((post.userId === req.body.userId) || req.body.isAdmin) {
            await postsServices.deletePost(post)
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
        const post = await postsServices.findPostById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await postsServices.likePost(post, req.body.userId) 
            res.status(200).json("Post has been liked");
        } else {
            await postsServices.dislikePost(post, req.body.userId) 
            res.status(200).json("Post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const addComment = async (req, res) => {
    try {
        const post = await postsServices.findPostById(req.params.id)
        if (!post.comments[0].id.includes(req.body.userId)) {
            const friend = { "id": req.body.userId, "post": req.params.id };
            await commentsServices.commentsAdded(post, friend) 
            res.status(200).json("Comments added");
        } else {
            const friend = { "id": req.body.userId, "post": req.params.id };
            await commentsServices.commentsDeleted(post, friend) 
            res.status(200).json("Comments deleted");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


const getAllCommentsByPostId = async (req, res) => {
    try {
        const comments = await commentsServices.findCommentsById(req.params.id)
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
}




const getPost = async (req, res) => {
    try {
        const post = await postsServices.findPostById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
}

const getTimelinedPosts = async (req, res) => {
    try {
        const currentUser = await userServices.findUserById(req.params.userId)
        const userPosts = await postsServices.findPostsByUserId(currentUser._id)
        const friendPosts = await Promise.all(
            currentUser.friends.map((friendId) => {
                return postsServices.findPostByFriendId(friendId)
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
}

const getTimelinedPostsAll = async (req, res) => {
    try {
        const posts =  await postsServices.findAllPosts()
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}


const getAllPosts = async (req, res) => {
    try {
        const user = await userServices.findUserByUsername(req.params.username)
        const posts = await  postsServices.findPostsByUserId(user._id)
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