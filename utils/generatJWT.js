const jwt = require('jsonwebtoken');

module.exports = async(payLoad) => {
    const token =await jwt.sign(
        payLoad, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' });
    return token;
}