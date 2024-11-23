const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: { 
        type: Number, 
        required: true, 
        min: [0, 'Total amount cannot be negative'] 
    },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI'], default: 'Cash' },
    transactionId: { type: String },
    orderStatus: { 
        type: String, 
        enum: ['Placed', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Placed' 
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
