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
            type : String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String, 
            required : true,
            min : 6
        },
        profilePicture: {
            type: String,
            default : ''
        },
        coverPicture : {
            type: String,
            default : ''
        },
        followers: {
            type: Array,
            default: []
        },
        followins: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps : true},
    { versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;