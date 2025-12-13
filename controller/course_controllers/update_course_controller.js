const { Error } = require('mongoose');
const Course = require('../../models/course_model');
const http_status_text = require('../../utils/http_status_text');
const asyncWrapper = require('../../middlewares/async_wrapper');


const updateCourse = asyncWrapper(
    async (req, res) => {
        const course = await Course.updateOne({_id: req.params.id}, { $set: {...req.body} });

   return res.status(200).json({status: http_status_text.SUCCESS, message: 'Course updated successfully',data: {data: course}});

}
);

module.exports = {
    updateCourse
};