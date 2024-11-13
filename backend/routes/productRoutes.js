const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.getAllProducts);
router.get('/category/:categoryName', controller.getProductsByCategory);
router.get('/category/:categoryName/subcategory/:subcategoryName', controller.getProductsBySubcategory);
router.get('/:id', controller.getProductById);

module.exports = router;