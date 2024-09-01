// routes/pendingRequests.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // JWT authentication middleware
const isAdmin = require('../middleware/isAdmin'); // Middleware to check if user is an admin
const PendingRequest = require('../models/PendingRequest'); // Pending Request model
const Product = require('../models/Product'); // Product model

// Approve or Reject a Pending Request
router.put('/:request_id', [auth, isAdmin], async (req, res) => {
    const { request_id } = req.params;
    const { status } = req.body; // status should be either 'approved' or 'rejected'

    try {
        // Find the pending request by ID
        let pendingRequest = await PendingRequest.findById(request_id);

        if (!pendingRequest) {
            return res.status(404).json({ msg: 'Pending request not found' });
        }

        // Ensure the status is either 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ msg: 'Invalid status. Must be "approved" or "rejected".' });
        }

        // Update the request status
        pendingRequest.status = status;
        await pendingRequest.save();

        // If approved, update the product details accordingly
        if (status === 'approved') {
            const product = await Product.findById(pendingRequest.productId);
            if (product) {
                // Update product details based on the pending request
                product.name = pendingRequest.updatedName || product.name;
                product.description = pendingRequest.updatedDescription || product.description;
                product.price = pendingRequest.updatedPrice || product.price;
                await product.save();
            }
        }

        res.json({ msg: `Request has been ${status}.` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
