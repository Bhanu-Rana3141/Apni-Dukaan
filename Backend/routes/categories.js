const express = require('express');
const router = express.Router();
const categories = require('../data/categories');

router.get('/', (req, res) => {
    res.json(categories);
});

router.get('/category/:categoryName', (req, res) => {
    const { categoryName } = req.params;
    const filteredProducts = products.filter(product => product.category === categoryName);
    res.json(filteredProducts);
});

module.exports = router;