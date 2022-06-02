const router = require('express').Router()
const usersController = require("../controllers/usersContoller");


//Update User
router.put('/:id', usersController.updateUser)

//Delete User
router.delete('/:id', usersController.deleteUser)

//Find User

router.get('/', usersController.findUser)

//Find Users

router.get('/all', usersController.findUsers)

//Get Followers 

router.get("/followers/:userId", usersController.getFollowers);


//Get Followings 

router.get("/followings/:userId", usersController.getFollowings);


//Get Friends 

router.get("/friends/:userId", usersController.getFriends);


//Follow User

router.put('/:id/follow', usersController.followUser)

//UnFollow User

router.put('/:id/unfollow', usersController.unfollowUser)


//add Friend User

router.put('/:id/addfriend', usersController.addFriend)


module.exports = router;