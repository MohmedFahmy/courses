const asyncWrapper = require('../../middlewares/async_wrapper');
const User = require('../../models/user_model');
const http_status_text = require('../../utils/http_status_text');
const app_errors = require('../../utils/app_errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers =asyncWrapper(
  async (req, res) => {
  const query = req.query;
  const limit =query.limit || 10;
  const page =query.page || 1;
  const skip = (page - 1) * limit;
 const users = await User.find({},{"__v": false,"password": false}).limit(limit).skip(skip);
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
    //hash password before saving (omitted for brevity)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    //generate JWT token (omitted for brevity)
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await newUser.save();
    return res.status(201).json({ status: http_status_text.SUCCESS, message: 'User registered successfully', data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = app_errors.createError('email and password are required', 400, http_status_text.FAILED);
        return next(error);
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        const error = app_errors.createError('Email not found', 401, http_status_text.FAILED);
        return next(error);
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if(matchPassword){
        return res.status(200).json({ status: http_status_text.SUCCESS, message: 'Logged in successful', data: { user: user } });
    }else{
        const error = app_errors.createError('Wrong password', 401, http_status_text.FAILED);
        return next(error);
    }
});

module.exports = {
    getAllUsers,    
    register,
    login
};