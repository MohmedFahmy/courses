const {validationResult}= require('express-validator');
const {courses} = require('../data/courses');
// Add a new course
const addNewCourse =  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const course = {id: courses.length + 1, ...req.body};
    courses.push(course);
    res.status(201).json(course);
}

module.exports = {
    addNewCourse
};