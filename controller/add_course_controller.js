const {validationResult}= require('express-validator');
let {courses} = require('../data/courses');

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