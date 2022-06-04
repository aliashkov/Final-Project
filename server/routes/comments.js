const router = require('express').Router()
const commentsController = require("../controllers/commentsController");
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

//Create Comment

router.post('/', commentsController.addComment)


//Get Comment

router.get("/:id", commentsController.getComment)




module.exports = router;