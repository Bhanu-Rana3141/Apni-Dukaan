const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    review: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps:true});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;