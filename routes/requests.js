const express = require('express');
const auth = require('../middleware/authMiddleware'); // Middleware for authentication
const Request = require('../models/Request');

const router = express.Router();

// @route   GET /api/pending-requests
// @desc    Get all pending requests
// @access  Private (accessible only by admins)
router.get('/', auth, async (req, res) => {
    try {
        // Check if user is admin
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only admins can view pending requests.' });
        }

        // Find all pending requests
        const requests = await Request.find({ status: 'pending' })
            .populate('product', ['name', 'description'])
            .populate('requestedBy', ['name', 'email']);

        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/pending-requests/:request_id
// @desc    Get a specific request by ID and update its status
// @access  Private (accessible only by admins)
router.get('/:request_id', auth, async (req, res) => {
    try {
        // Check if user is admin
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only admins can view this request.' });
        }

        const request = await Request.findById(req.params.request_id)
            .populate('product', ['name', 'description'])
            .populate('requestedBy', ['name', 'email']);

        if (!request) {
            return res.status(404).json({ msg: 'Request not found' });
        }

        res.json(request);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Request not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/pending-requests/:request_id
// @desc    Update the status of a specific request (approve/reject)
// @access  Private (accessible only by admins)
router.put('/:request_id', auth, async (req, res) => {
    const { status } = req.body; // "approved" or "rejected"

    try {
        // Check if user is admin
        const user = req.user;
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only admins can update the request status.' });
        }

        // Find the request by ID
        let request = await Request.findById(req.params.request_id);

        if (!request) {
            return res.status(404).json({ msg: 'Request not found' });
        }

        // Update request status
        request.status = status;
        await request.save();

        res.json({ msg: `Request has been ${status}.` });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Request not found' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;
