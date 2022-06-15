const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        userId : {
            type: String,
            required: true,
        },
        postId : {
            type: String,
            required: true,
        },
        description : {
            type : String,
            max : 500
        },
        file : {
            type : String,
        },
        likes : {
            type : Array,
            default: [],
        },
    },
    { timestamps: true },
    { versionKey: false }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;