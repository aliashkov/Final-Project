const router = require('express').Router()
const multer = require('../middleware/multer');
const uploadContoller = require('../controllers/uploadController')


router.post("/", multer , uploadContoller.upload)

module.exports = router;