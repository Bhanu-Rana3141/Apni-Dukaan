const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const Order = require('../models/orderModel');
const Cart = require('../models/CartModel');
const nodemailer = require('nodemailer');

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

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider here (e.g., Gmail, SendGrid, etc.)
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS, // your email password or API key (if using SendGrid or others)
    },
});

// Helper function to send an email
const sendOrderConfirmationEmail = (userEmail, order) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Order Confirmation - Order ID: ${order._id}`,
        text: `Thank you for your order!\n\nYour order has been successfully placed. Below are the details:\n\nOrder ID: ${order._id}\nTotal Amount: ₹${order.totalAmount}\n\nOrder Details:\n${order.products.map((item) => `${item.productId.name} x ${item.quantity}`).join('\n')}\n\nThank you for shopping with us!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
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
            
            // Send email after order is successfully placed
            const user = req.user; // Assuming user details are available in req.user
            sendOrderConfirmationEmail(user.email, order); // Send order confirmation email to the user

            res.status(200).json({
                success: true,
                message: 'Payment verified, order stored successfully, and cart cleared.',
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