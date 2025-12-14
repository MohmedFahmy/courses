const asyncWrapper = require('../../middlewares/async_wrapper');
const User = require('../../models/user_model');
const http_status_text = require('../../utils/http_status_text');

const getAllUsers =asyncWrapper(
  async (req, res) => {
  const query = req.query;
  const limit =query.limit || 10;
  const page =query.page || 1;
  const skip = (page - 1) * limit;
 const users = await User.find({},{"__v": false}).limit(limit).skip(skip);
    res.json({status: http_status_text.SUCCESS, msg: 'Users retrieved successfully', data: {users: users},});
  
}
);



const register = asyncWrapper(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
});

const login = (req, res) => {};

module.exports = {
    getAllUsers,
    register,
    login
};