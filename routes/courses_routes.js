const express = require('express');
const router = express.Router();



const {getAllCourses, getCourseById} = require('../controller/course_controllers/get_courses_controler');
const {addNewCourse} = require('../controller/course_controllers/add_course_controller');
const {updateCourse} = require('../controller/course_controllers/update_course_controller');
const {deleteCourse} = require('../controller/course_controllers/delete_courses_controller');   
const {validateCourse}= require('../middlewares/validation_schema');
const verifyToken = require('../middlewares/verfiyToken');
const userRoles = require('../utils/roles');
const allowTo = require('../middlewares/allowedTo');



router.route ('/')
            .get(getAllCourses)
            .post(
                verifyToken,
                allowTo(userRoles.INSTRUCTOR),
                validateCourse,
                addNewCourse
                );


router.route('/:id') 
            .get(getCourseById)
            .patch(updateCourse)
            .delete(verifyToken, allowTo(userRoles.ADMIN, userRoles.INSTRUCTOR), deleteCourse)




module.exports = router;