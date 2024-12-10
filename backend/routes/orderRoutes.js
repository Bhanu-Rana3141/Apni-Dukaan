const express = require('express');
const { getUserOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.get('/', authMiddleware, getUserOrders);

module.exports = router;
