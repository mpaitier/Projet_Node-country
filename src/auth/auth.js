const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, privateKey);

        if (decodedToken && decodedToken.userId ) {
            req.userId = decodedToken.userId;
        }

        if (req.body && req.body.userId && decodedToken.userId !== req.body.userId) {
            return res.status(401).json({ message: 'The user ID is invalid.' });
        }
        next();
    }
    catch (error) {
        let message = 'Invalid token. Please log in again.'
        if (error.name === 'TokenExpiredError') {
            message = `Token expired. Please login again.`
        } else if (error.name === 'JsonWebTokenError') {
            message = `Invalid token format. Please login again.`
        }
            
        return res.status(401).json({
            message,
            data: {
                error: error.name || 'TokenVerificationError',
                details: error.message
            }
        })
  }
}