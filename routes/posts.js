const router = require('express').Router()
const postsController = require("../controllers/postsContoller");
const Post = require('../models/Post');
const User = require('../models/User');

//Create Post

router.post('/', postsController.addPost)

//Update Post

router.put("/:id", postsController.updatePost);

//Delete Post

router.delete("/:id", postsController.deletePost);

//Like - Unlike Post

router.put("/:id/like", postsController.likePost);

//Get Post

router.get("/:id", postsController.getPost);


//Get timeline Posts

router.get("/timeline/all", postsController.getTimelinedPosts);

module.exports = router;