const {validationResult}= require('express-validator');
const Course = require('../../models/course_model');
const http_status_text = require('../../utils/http_status_text');
const asyncWrapper = require('../../middlewares/async_wrapper');
const app_errors = require('../../utils/app_errors');

const addNewCourse =  asyncWrapper(
    async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
const error = app_errors.createError(errors.array(), 400, http_status_text.ERROR);
return next(error);
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({status: http_status_text.SUCCESS, message: 'Course added successfully', data: {course: newCourse}});
}
);

module.exports = {
    addNewCourse
};