const express = require('express');
const controller = require('../controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to authenticate user
const router = express.Router();

router.post('/addAddress', authMiddleware, controller.addAddress);
router.get('/getAddress', authMiddleware, controller.getAddress);
router.put('/updateAddress', authMiddleware, controller.updateAddress);

module.exports = router;