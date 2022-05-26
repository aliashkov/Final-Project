const router = require('express').Router()
const authController = require("../controllers/authController");
const verify = require('../middleware/verify');

router.post('/refresh', authController.refresh)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', verify, authController.logout)

module.exports = router;