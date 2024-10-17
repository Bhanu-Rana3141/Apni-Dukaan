const express = require('express');
const { getAllProducts, getProductsByCategory, getProductsBySubcategory } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category/:categoryName', getProductsByCategory);
router.get('/category/:categoryName/subcategory/:subcategoryName', getProductsBySubcategory);

module.exports = router;