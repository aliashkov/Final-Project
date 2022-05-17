const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
    },
    { timestamps: true },
    { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;