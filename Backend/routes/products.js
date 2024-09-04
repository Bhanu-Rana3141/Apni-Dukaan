const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.get('/category/:categoryName', (req, res) => {
    const { categoryName } = req.params;
    const lowerCaseCategoryName = categoryName.toLowerCase().trim();
    const filteredProducts = products.filter(product => product.category.toLowerCase().trim() === lowerCaseCategoryName);
    res.json(filteredProducts);
});

router.get('/category/:categoryName/subcategory/:subcategoryName', (req, res) => {
    const {categoryName , subcategoryName } = req.params;
    const lowerCaseCategoryName = categoryName.toLowerCase().trim();
    const lowerCaseSubcategoryName = subcategoryName.toLowerCase().trim();
    const filteredProducts = products.filter(product => 
        product.category.toLowerCase().trim() === lowerCaseCategoryName && 
        product.subcategory.toLowerCase().trim() === lowerCaseSubcategoryName);
    res.json(filteredProducts);
});
  

module.exports = router;