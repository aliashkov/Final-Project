const User = require('../models/User');

const findUserById = (userId) => {
    return User.findById(userId);
}

const findUserByUsername = (username) => {
    return User.findOne({ username: username });
}

const newUserRegister = (username, email , hashedPassword) => {
    return new User({
        username: username,
        email: email,
        password: hashedPassword,
    });
}

const newUserSave = (newUser) => {
    return  newUser.save();
}

const findUserByEmail = (email) => {
    return User.findOne({ email: email });
}

const findUserAndUpdate = (id , body) => {
    return User.findByIdAndUpdate(id,
        { $set: body }
    );
}

const deleteUser = (id) => {
    return User.findByIdAndDelete({ _id: id });
}

const getAllUsers = () => {
    return User.find({});
}

const updateRelationships = (userId , id) => {
    return User.findOneAndUpdate({_id : userId}, { $pull: { friends: id , followings : id , followers: id } });
}

const updateFollowings = (user , id) => {
    return user.updateOne({ $push: { followings: id } })
}

const updateFollowers = (user , id) => {
    return user.updateOne({ $push: { followers: id } })
}

const removeFollowings = (user , id) => {
    return user.updateOne({ $pull: { followings: id } })
}

const removeFollowers = (user , id) => {
    return user.updateOne({ $pull: { followers: id } })
}

const updateFriends = (user , id) => {
    return user.updateOne({ $push: { friends: id } })
}

const removeFriends = (user , id) => {
    return user.updateOne({ $pull: { friends: id } })
}



module.exports = {
    findUserById,
    findUserByUsername,
    newUserRegister,
    newUserSave,
    findUserByEmail,
    findUserAndUpdate,
    deleteUser,
    getAllUsers,
    updateRelationships,
    updateFollowings,
    updateFollowers,
    removeFollowings,
    removeFollowers,
    updateFriends,
    removeFriends
}