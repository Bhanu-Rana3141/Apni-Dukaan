const express = require('express');
const router = express.Router();
const {getAllCategories, getProductsByCategory} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/:categoryName/products', getProductsByCategory);

module.exports = router;