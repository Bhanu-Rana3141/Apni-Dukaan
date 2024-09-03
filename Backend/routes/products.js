const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/category/:categoryName', (req, res) => {
    const { categoryName } = req.params;
    const lowerCaseCategoryName = categoryName.toLowerCase();
    const filteredProducts = products.filter(product => product.category.toLowerCase() === lowerCaseCategoryName);
    res.json(filteredProducts);
});

router.get('/subcategory/:subcategoryName', (req, res) => {
    const { subcategoryName } = req.params;
    const lowerCaseCategoryName = subcategoryName.toLowerCase().trim();
    const filteredProducts = products.filter(product => product.subcategory.toLowerCase().trim() === lowerCaseCategoryName);
    res.json(filteredProducts);
});
  

module.exports = router;