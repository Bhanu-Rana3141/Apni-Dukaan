const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Fetch all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Fetch products by category
const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params;

    try {
        // Find the category
        const category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, 'i') } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Fetch products in this category
        const products = await Product.find({ category: category._id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getProductsBySubcategory = async (req, res) => {
    const { categoryName, subcategoryName } = req.params;

    try {
        // Find the category
        const category = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, 'i') } });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Find products in this category and subcategory
        const products = await Product.find({ 
            category: category._id, 
            subcategory: { $regex: new RegExp(`^${subcategoryName}$`, 'i') } // Assuming subcategory is a field in Product
        });
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getAllProducts, getProductsByCategory, getProductsBySubcategory };