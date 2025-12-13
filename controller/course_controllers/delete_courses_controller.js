const Course = require('../../models/course_model');
const http_status_text = require('../../utils/http_status_text');
const asyncWrapper = require('../../middlewares/async_wrapper');

const deleteCourse = asyncWrapper(
    async (req, res) => {
            const deleteCourse = await Course.deleteOne({_id: req.params.id});
    res.status(200).json({status: http_status_text.SUCCESS, message: 'Course deleted successfully',data: null});

}
);
module.exports = { 
    deleteCourse
};

