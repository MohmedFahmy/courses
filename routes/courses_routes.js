const express = require('express');
const router = express.Router();



const {getAllCourses, getCourseById} = require('../controller/get_courses_controler');
const {addNewCourse} = require('../controller/add_course_controller');
const {updateCourse} = require('../controller/update_course_controller');
const {deleteCourse} = require('../controller/delete_courses_controller');   
const {validateCourse}= require('../middlewares/validation_schema');



router.route ('/')
            .get(getAllCourses)
            .post(
                validateCourse,
                addNewCourse
                );


router.route('/:id') 
            .get(getCourseById)
            .patch(updateCourse)
            .delete(deleteCourse)




module.exports = router;