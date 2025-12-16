const app_errors = require('../utils/app_errors');
const http_status_text = require('../utils/http_status_text');


module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(
                app_errors.createError(
                    'You are not allowed to access this route',
                    403,
                    http_status_text.ERROR
                )
            );
        }

        next(); 
    }
}
