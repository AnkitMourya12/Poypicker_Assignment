const express = require('express');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Dashboard route
router.get('/', auth, async (req, res) => {
    try {
        // Get user details from the database
        const user = await User.findById(req.user.id).select('-password');

        // Check the user's role
        if (user.role === 'admin') {
            // Admin dashboard content
            res.json({
                msg: 'Welcome to the Admin Dashboard',
                data: {
                    role: user.role,
                    username: user.username,
                    // You can add more admin-specific data here
                },
            });
        } else if (user.role === 'team-member') {
            // Team member dashboard content
            res.json({
                msg: 'Welcome to the Team Member Dashboard',
                data: {
                    role: user.role,
                    username: user.username,
                    // You can add more team-member-specific data here
                },
            });
        } else {
            res.status(403).json({ msg: 'Access denied' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
