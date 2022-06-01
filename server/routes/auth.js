const router = require('express').Router()
const authController = require("../controllers/authController");
const verify = require('../middleware/verify');
const loginValidator = require('../middleware/check')
const registerValidator = require('../middleware/check')

router.post('/refresh', authController.refresh)
router.post('/register', registerValidator(), authController.register)
router.post('/login', loginValidator() , authController.login)
router.post('/logout', verify, authController.logout)

module.exports = router;