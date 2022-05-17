const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        userId : {
            type: String,
            required: true,

        },
        description : {
            type : String,
            max : 500
        },
        img : {
            type : String,
        },
        likes : {
            type : Array,
            default: [],
        }
    },
    { timestamps: true },
    { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;