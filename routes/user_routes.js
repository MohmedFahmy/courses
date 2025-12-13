const express = require('express');
const router = express.Router();
const userControllers = require('../controller/user_controllers/user_controllers');


// get all users
router.route ('/')
            .get(userControllers.getAllUsers)

// register

// login



            







module.exports = router;