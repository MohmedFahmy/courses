const express = require('express');
const router = express.Router();
const userControllers = require('../controller/user_controllers/user_controllers');


// get all users
router.route ('/')
            .get(userControllers.getAllUsers)

// register
router.route ('/register')
            .post(userControllers.register)

// login
router.route ('/login')
            .post(userControllers.login)
            







module.exports = router;