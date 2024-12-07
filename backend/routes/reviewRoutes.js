const express = require('express');
const controller = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new review 
router.post('/add', authMiddleware, controller.addReview);

// Get all reviews for a product 
router.get('/:productId', controller.getReviewsByProduct);

module.exports = router;
