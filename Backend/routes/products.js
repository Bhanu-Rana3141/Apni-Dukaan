const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/category/:categoryName', (req, res) => {
    const { categoryName } = req.params;
    const lowerCaseCategoryName = categoryName.toLowerCase();
    const filteredProducts = products.filter(product => product.category.toLowerCase() === lowerCaseCategoryName);
    res.json(filteredProducts);
});

router.get('/category/:categoryName/subcategory/:subcategoryName', (req, res) => {
    const { subcategoryName } = req.params;
    const lowerCaseCategoryName = categoryName.toLowerCase().trim();
    const lowerCaseSubcategoryName = subcategoryName.toLowerCase().trim();
    const filteredProducts = products.filter(product => 
        product.category.toLowerCase().trim() === lowerCaseCategoryName && 
        product.subcategory.toLowerCase().trim() === lowerCaseCategoryName);
    res.json(filteredProducts);
});
  

module.exports = router;