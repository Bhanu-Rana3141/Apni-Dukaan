const express = require('express');
const router = express.Router();
const subcategories = require('../data/subcategories');

router.get('/category/:categoryName', (req, res) => {
    const { categoryName } = req.params;
    const lowerCaseCategoryName = categoryName.toLowerCase();
    const filteredSubcategories = subcategories[lowerCaseCategoryName] || [];
    res.json(filteredSubcategories);
});

module.exports = router;
