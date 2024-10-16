const jwt = require('jsonwebtoken');

// Protect route middleware
const protect = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, "#######");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// Role-based access control middleware
const roleMiddleware = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied, insufficient permissions' });
      }
      next();
    };
  };



module.exports = {  protect, roleMiddleware };
