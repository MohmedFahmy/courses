let {courses} = require('../data/courses');

// Delete a course
const deleteCourse = (req, res) => {
    const courseId = +req.params.courseId;
    courses = courses.filter(c => c.id !== courseId);
    res.status(200).json({msg: 'Course deleted successfully'});
}
module.exports = {
    deleteCourse
};

