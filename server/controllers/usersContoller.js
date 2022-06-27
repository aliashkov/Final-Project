const bcrypt = require('bcrypt')
const userServices = require('../services/userServices');
const commentsServices = require('../services/commentsServices');
const postsServices = require('../services/postsServices');


const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            await userServices.findUserAndUpdate(req.params.id , req.body)
            res.status(200).json('Account has been updated')
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        return res.status(403).json('You can update only your account')
    }
}

const deleteUser = async (req, res) => {
    console.log(req.body.userId)
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await userServices.deleteUser(req.params.id)
            await postsServices.deletePostsByUser(req.params.id)
            await commentsServices.deleteCommentsByUser(req.params.id)
            const users = await userServices.getAllUsers()

            await Promise.all(
                users.map((user) => {
                    const { _id, friends , followings , followers } = user;
                    if (friends.includes(req.params.id) || followings.includes(req.params.id) || followers.includes(req.params.id)) {
                        return userServices.updateRelationships(_id , req.params.id) 
                    }
                }
            ));
            
            res.status(200).json('This account has been deleted successfully')
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        return res.status(403).json('You can delete only your account')
    }
}

const findUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await userServices.findUserById(userId)
            : await userServices.findUserByUsername(username)
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
}

const findUsers = async (req, res) => {
    try {
        const user = await userServices.getAllUsers()
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFollowers = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.userId)
        const followers = await Promise.all(
            user.followings.map((followId) => {
                return userServices.findUserById(followId)
            })
        );
        let followList = [];
        followers.map((follow) => {
            const { _id, username, profilePicture } = follow;
            followList.push({ _id, username, profilePicture });
        });
        res.status(200).json(followList)
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFollowings = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.userId)
        const followings = await Promise.all(
            user.followers.map((followId) => {
                return userServices.findUserById(followId)
            })
        );
        let followingList = [];
        followings.map((follow) => {
            const { _id, username, profilePicture } = follow;
            followingList.push({ _id, username, profilePicture });
        });
        res.status(200).json(followingList)
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFriends = async (req, res) => {
    try {
        const user = await userServices.findUserById(req.params.userId)
        const friends = await Promise.all(
            user.friends.map((followId) => {
                return userServices.findUserById(followId)
            })
        );
        let friendsList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendsList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendsList)
    } catch (err) {
        res.status(500).json(err);
    }
}





const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await userServices.findUserById(req.params.id)
            const currentUser = await userServices.findUserById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await userServices.updateFollowers(user, req.body.userId)
                await userServices.updateFollowings(currentUser, req.params.id)
                res.status(200).json('User has been followed')
            } else {
                res.status(403).json('You already followed this user')
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You cant follow yourself')
    }
}

const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await userServices.findUserById(req.params.id)
            const currentUser = await userServices.findUserById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await userServices.removeFollowers(user, req.body.userId)
                await userServices.removeFollowings(currentUser, req.params.id)
                res.status(200).json('User has been unfollowed')
            } else {
                res.status(403).json('You already unfollowed this user')
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You cant unfollow yourself')
    }
}

const addFriend = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await userServices.findUserById(req.params.id)
            const currentUser = await userServices.findUserById(req.body.userId)

            
            if (!user.friends.includes(req.body.userId)) {
                await userServices.removeFollowings(user, req.body.userId)
                await userServices.removeFollowers(currentUser, req.params.id)
                
                await userServices.updateFriends(user,  req.body.userId)
                await userServices.updateFriends(currentUser,  req.params.id)
                res.status(200).json('User successfully added to friends')
            } else {
                res.status(403).json(user)
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You cant add friend yourself')
    }
}

const removeFriend = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await userServices.findUserById(req.params.id)
            const currentUser = await userServices.findUserById(req.body.userId)

            
            if (user.friends.includes(req.body.userId)) {

                await userServices.updateFollowings(user, req.body.userId)
                await userServices.updateFollowers(currentUser, req.params.id)
                
                await userServices.removeFriends(user,  req.body.userId)
                await userServices.removeFriends(currentUser,  req.params.id)

                res.status(200).json('User successfully removed friend')
            } else {
                res.status(403).json(user)
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json('You cant remove friend yourself')
    }
}





module.exports = {
    updateUser,
    deleteUser,
    findUser,
    followUser,
    unfollowUser,
    addFriend,
    removeFriend,
    getFollowers,
    getFollowings,
    getFriends,
    findUsers
}