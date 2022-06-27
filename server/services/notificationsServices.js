const Notification = require('../models/Notification')

const newNotification = (newNotification) => {
    return new Notification(newNotification)
}

const savedNotification = (newNotification) => {
    return newNotification.save();
}

const findNotificationsById = (userId) => {
    return Notification.find({
        userId : userId
    })
}

const deleteNotificationsById = (userId) => {
    return  Notification.deleteMany({userId : userId});
}




module.exports = {
    newNotification,
    savedNotification,
    findNotificationsById,
    deleteNotificationsById
}