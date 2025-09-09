const jwt = require('jsonwebtoken');

const userId = (req, res, next) => {
    const token = req.cookies.token;
if (!token) {
  return res.status(401).json({
    message: 'Session expired or not authenticated. Please log in again for security reasons.',
    success: false
  });
}const {userId,email,iat,exp} = jwt.verify(token,process.env.JWT_SECURE_KEY);
    req.userId = userId;
    req.token = token
    next();
};

module.exports = userId;

