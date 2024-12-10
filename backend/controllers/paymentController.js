const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Order = require('../models/orderModel');
const Cart = require('../models/CartModel');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
exports.createOrder = async (req, res) => {
    const { amount } = req.body;

    // Validate the amount
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }

    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Error creating Razorpay order' });
    }
};

// Verify Razorpay signature
exports.verifyPayment = async (req, res) => {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    
    // Generate the expected signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');

    if (generatedSignature === razorpaySignature) {
        // Payment is verified
        try {
            // Fetch the cart for the user
            const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    
            // Calculate the total price
            const totalPrice = cart.products.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
    
            // Create a new order with the cart items
            const order = new Order({
                userId: req.user.id,
                products: cart.products,
                totalAmount: totalPrice,
                razorpayOrderId,
                razorpayPaymentId,
            });
    
            // Save the order to the database
            await order.save();
    
            // Clear the user's cart after saving the order
            await Cart.deleteOne({ userId: req.user.id });
    
            res.status(200).json({
                success: true,
                message: 'Payment verified, order stored successfully, and cart cleared.',
                order,
            });
        } catch (error) {
            console.error('Error processing order:', error);
            res.status(500).json({ success: false, error: 'Failed to process order. Please try again later.' });
        }

    } else {
        // Payment verification failed
        res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
};