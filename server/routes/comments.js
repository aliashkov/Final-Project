const router = require('express').Router()
const commentsController = require("../controllers/commentsController");
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

//Create Comment

router.post('/', commentsController.addComment)


//Get Comment

router.get("/:id", commentsController.getComment)


//Like - Unlike Comment

router.put("/:id/like", commentsController.likeComment);




module.exports = router;