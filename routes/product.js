const express = require('express');
const auth = require('../middleware/authMiddleware'); // Middleware for authentication
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/product/:product_id
// @desc    Get a specific product by ID
// @access  Private (accessible by both admin and team members)
router.get('/:product_id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.product_id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   POST /api/product/add
// @desc    Add a new product
// @access  Private (accessible only by admins)
router.post('/add', auth, async (req, res) => {
    const { name, description, price } = req.body;

    try {
        // Check if user is admin
        const user = req.user; // This comes from the middleware after verifying the token
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Only admins can add products.' });
        }

        // Create a new product instance
        const newProduct = new Product({
            name,
            description,
            price,
            createdBy: user.id,
        });

        // Save the product to the database
        const product = await newProduct.save();
        res.json(product);

        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
