const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        userId : {
            type: String,
        },
        sender : {
            type: String
        },
        type : {
            type : String
        }
    },
    { timestamps: true },
    { versionKey: false }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;