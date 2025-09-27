const express = require('express');
const app = express();
const {body, validationResult}= require('express-validator');
app.use(express.json());


const {getAllCourses, getCourseById} = require('./controller/get_courses_controler');
const {addNewCourse} = require('./controller/add_course_controller');
const {updateCourse} = require('./controller/update_course_controller');
const {deleteCourse} = require('./controller/delete_courses_controller');   

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 


app.get('/api/courses', getAllCourses);

app.get('/api/courses/:id', getCourseById);

app.post('/api/courses',
    body('name').notEmpty().withMessage('Name is required').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long'), 
    body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
    addNewCourse
   );

app.patch('/api/courses/:courseId', updateCourse);

app.delete('/api/courses/:courseId', deleteCourse);
