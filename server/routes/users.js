const router = require('express').Router()
const usersController = require("../controllers/usersContoller");


//Update User
router.put('/:id', usersController.updateUser)

//Delete User
router.delete('/:id', usersController.deleteUser)

//Find User

router.get('/:id', usersController.findUser)

//Follow User

router.put('/:id/follow', usersController.followUser)

//UnFollow User

router.put('/:id/unfollow', usersController.unfollowUser)


module.exports = router;