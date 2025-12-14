

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader.split(' ')[1];
    console.log("Verifying token:", token);
    next();
};