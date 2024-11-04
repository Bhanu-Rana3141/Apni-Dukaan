const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header
    if (!token) {
        return res.status(401).json({ message: "Please log in" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
        req.user = decoded; // Attach user info to the request
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;