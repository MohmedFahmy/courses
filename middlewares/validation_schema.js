const {body}= require('express-validator');


const validateCourse = [
    body('title').notEmpty().withMessage('Title is required').isString().isLength({min: 3}).withMessage('Title must be at least 3 characters long'), 
                body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
];

module.exports = {
    validateCourse
};