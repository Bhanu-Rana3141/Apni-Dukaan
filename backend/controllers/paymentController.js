const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/OrderModel'); // Import Order model
require('dotenv').config();

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: 'Missing payment details' });
    }

    try {
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Save payment details to database
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: razorpay_order_id }, // Assuming you store order IDs in the database
                {
                    paymentStatus: 'Paid',
                    transactionId: razorpay_payment_id,
                },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.status(200).json({ message: 'Payment verified successfully', order: updatedOrder });
        } else {
            res.status(400).json({ error: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Error verifying payment' });
    }
};
