const path = require('path');
const multer = require('multer');
const fs = require('fs');


const uploadDir = path.join(__dirname, '../uploads/perfiles');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const uploadImage = multer({ storage });

module.exports = uploadImage;