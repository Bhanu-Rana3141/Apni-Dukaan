const Review = require('../models/reviewModel');

// Add a new review
exports.addReview = async (req, res) => {
    try {
        const { productId, review } = req.body;
        const userId = req.user.id;
        const newReview = await Review.create({ productId, review, user: userId });
        res.status(201).json({ message: 'Review added successfully!', review: newReview });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add review' });
    }
};

// Get reviews for a product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
