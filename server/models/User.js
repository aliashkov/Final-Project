const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        profilePicture: {
            type: String,
            default: ''
        },
        coverPicture: {
            type: String,
            default: ''
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
        friends: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            max: 50
        },
        city: {
            type: String,
            max: 50
        },
        country: {
            type: String,
            max: 50
        },
        isHidden : {
            type : Boolean,
        },
        birthDate : {
            type : Date,
        }
    },
    { timestamps: true },
    { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;