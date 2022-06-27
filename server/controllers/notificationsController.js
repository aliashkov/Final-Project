const notificationsServices = require('../services/notificationsServices');

const newNotification = async (req, res) => {
    const notification =  await notificationsServices.newNotification(req.body)
    try {
        const savedNotification = await notificationsServices.savedNotification(notification)
        res.status(200).json(savedNotification);;
    } catch (err) {
        res.status(500).json(err);
    }
}


const getNotificationsById = async (req, res) => {

    try {
        const notifications = await notificationsServices.findNotificationsById(req.params.userId)
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteNotifications = async (req, res) => {
    try {
        await notificationsServices.deleteNotificationsById(req.params.userId)
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