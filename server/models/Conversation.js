const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversatonSchema = new Schema(
    {
        members : {
            type: Array,
        },
    },
    { timestamps: true },
    { versionKey: false }
);

const Conversation = mongoose.model("Conversation", conversatonSchema);

module.exports = Conversation;