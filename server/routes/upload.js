const router = require('express').Router()
const multer = require('../middleware/multer');
const uploadContoller = require('../controllers/uploadController')
const verify = require('../middleware/verify');


router.post("/", verify, multer , uploadContoller.upload)

module.exports = router;