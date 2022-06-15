const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/files");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})


module.exports = multer({ storage: storageConfig }).single('file');