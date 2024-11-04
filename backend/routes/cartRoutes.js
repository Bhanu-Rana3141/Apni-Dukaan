const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getCart);
router.put('/update', authMiddleware, cartController.updateCartItem); 
router.delete('/remove', authMiddleware, cartController.removeCartItem); 

module.exports = router;