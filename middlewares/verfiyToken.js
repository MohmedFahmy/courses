
const jwt = require('jsonwebtoken');
const app_errors = require('../utils/app_errors');
const http_status_text = require('../utils/http_status_text');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader ) {
        const error = app_errors.createError('No token provided', 401, http_status_text.ERROR);
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        const error = app_errors.createError('Invalid token', 401, http_status_text.ERROR);
                return next(error);
    }
};
module.exports = verifyToken;