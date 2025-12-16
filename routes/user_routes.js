const express = require('express');
const router = express.Router();
const userControllers = require('../controller/user_controllers/user_controllers');
const verifyToken = require('../middlewares/verfiyToken');
const multer = require('multer');
const app_errors = require('../utils/app_errors');
const http_status_text = require('../utils/http_status_text');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file:', file);
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const extention = file.mimetype.split('/')[1];
        const fileName = 'user-' + Date.now() + '.' + extention;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes =file.mimetype.split('/')[0];
    if (fileTypes === 'image') {
       return cb(null, true);
    } else {
       return cb(app_errors.createError('Only images are allowed', 400, http_status_text.ERROR), false);
    }
}
const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

// get all users
router.route ('/')
            .get(verifyToken,userControllers.getAllUsers)

// register
router.route ('/register')
            .post(upload.single('avatar'),userControllers.register)

// login
router.route ('/login')
            .post(userControllers.login)
            







module.exports = router;