const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create an order
router.post('/order', createOrder);

// Route to verify payment
router.post('/verify', authMiddleware, verifyPayment);

module.exports = router;