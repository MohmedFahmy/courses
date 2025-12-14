const asyncWrapper = require('../../middlewares/async_wrapper');
const User = require('../../models/user_model');
const http_status_text = require('../../utils/http_status_text');
const app_errors = require('../../utils/app_errors');

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



const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        // return res.status(409).json({ status: http_status_text.FAILED, message: 'User already exists. Please login.' });
        const error = app_errors.createError('User already exists. Please login.', 409, http_status_text.FAILED);
        return next(error);
    }
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    return res.status(201).json({ status: http_status_text.SUCCESS, message: 'User registered successfully', data: { user: newUser } });
});

const login = (req, res) => {};

module.exports = {
    getAllUsers,
    register,
    login
};