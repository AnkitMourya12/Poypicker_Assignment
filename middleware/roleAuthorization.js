// middleware/roleAuthorization.js

const roleAuthorization = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ msg: 'Access denied: Insufficient permissions' });
        }
        next();
    };
};

module.exports = roleAuthorization;
