const router = require('express').Router()
const notificationsController = require("../controllers/notificationsController");
const Notification = require('../models/Notification');

// New Notification 

router.post("/" , notificationsController.newNotification)

// Get Notifications of user

router.get("/:userId" , notificationsController.getNotificationsById)

// Delete Notifications of user

router.delete("/:userId" , notificationsController.deleteNotifications)




module.exports = router;