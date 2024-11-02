const express = require('express');
const { getAllProducts, getProductsByCategory, getProductsBySubcategory, getProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category/:categoryName', getProductsByCategory);
router.get('/category/:categoryName/subcategory/:subcategoryName', getProductsBySubcategory);
router.get('/:id', getProductById);

module.exports = router;