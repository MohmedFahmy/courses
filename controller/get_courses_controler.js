const Course = require('../models/course_model');
const http_status_text = require('../utils/http_status_text');
const asyncWrapper = require('../middlewares/async_wrapper');
const app_errors = require('../utils/app_errors');

const getAllCourses =asyncWrapper(
  async (req, res) => {
  const query = req.query;
  const limit =query.limit || 10;
  const page =query.page || 1;
  const skip = (page - 1) * limit;
 const courses = await Course.find({},{"__v": false}).limit(limit).skip(skip);
    res.json({status: http_status_text.SUCCESS, msg: 'Courses retrieved successfully', data: {courses: courses},});
  
}
);


const getCourseById =asyncWrapper(
  async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    const error =app_errors.createError('Course not found', 404, http_status_text.FAILED);
    return next(error);
  }
  res.send({status: http_status_text.SUCCESS, msg: 'Course retrieved successfully', data: {course: course},});


});

module.exports = {
    getAllCourses,
    getCourseById
};