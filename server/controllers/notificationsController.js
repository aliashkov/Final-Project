const Notification = require('../models/Notification')


const newNotification = async (req, res) => {
    const notification = new Notification(req.body)
    try {
        const savedNotification = await notification.save();
        res.status(200).json(savedNotification);;
    } catch (err) {
        res.status(500).json(err);
    }
}


const getNotificationsById = async (req, res) => {

    try {
        const notifications = await Notification.find({
            userId : req.params.userId
        })
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({userId : req.params.userId});
        res.status(200).json("Notifcations has been deleted");

    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports = {
    newNotification,
    getNotificationsById,
    deleteNotifications
}