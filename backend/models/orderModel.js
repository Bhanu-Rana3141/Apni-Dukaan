const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Product',
                    required: true,
                },
                name: String,
                image: String,
                price: Number,
                quantity: {
                    type: Number,
                    default: 1,
                    required: true
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        razorpayOrderId: String,
        razorpayPaymentId: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
