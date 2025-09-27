const {courses} = require('../data/courses');
// Get all courses
const getAllCourses = (req, res) => {
  res.json(courses);
};


// Get a specific course by ID
const getCourseById = (req, res) => {
    const courseId = +req.params.id;
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({msg: 'The course with the given ID was not found'});
  }
  res.send(course);
}
module.exports = {
    getAllCourses,
    getCourseById
};