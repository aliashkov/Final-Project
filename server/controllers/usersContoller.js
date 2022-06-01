const User = require('../models/User')
const bcrypt = require('bcrypt')


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
            const user = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body }
            );
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
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json('Account has been deleted')
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
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
}

const findUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err);
    }
}

const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
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
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
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

module.exports = {
    updateUser,
    deleteUser,
    findUser,
    followUser,
    unfollowUser,
    getFriends,
    findUsers
}