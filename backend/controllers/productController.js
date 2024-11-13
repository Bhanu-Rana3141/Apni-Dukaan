const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params;

    try {
        // Find the category -> The $regex operator is used to perform a case-insensitive search
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
            subcategory: { $regex: new RegExp(`^${subcategoryName}$`, 'i') } 
        });
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get product by ID - to fetch a product on product description page
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllProducts, getProductsByCategory, getProductsBySubcategory, getProductById };