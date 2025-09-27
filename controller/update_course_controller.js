const {courses} = require('../data/courses');

// Update an existing course
const updateCourse = (req, res) => {
    const courseId = +req.params.courseId;
    let course = courses.find(c => c.id === courseId);
    if (!course) {
        return res.status(404).json({msg: 'The course with the given ID was not found'});
    }
    course = { ...course, ...req.body };
    res.status(200).json(course);
}

module.exports = {
    updateCourse
};