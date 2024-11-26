const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const products = require('../data/products.json');

const insertProducts = async () => {
    try {
        await connectDB();
        console.log("mongodb connected !!");

        // fetch all categories
        await Product.deleteMany({});
        const categories = await Category.find({});

        // mapping categories name to their ObjectId
        const categoryMap = {};
        categories.forEach(category => {
            categoryMap[category.name] = category._id;
        });

        // setting product to category id
        products.forEach(product => {
            if(categoryMap[product.category]) {
                product.category = categoryMap[product.category];
            }
            else {
                console.log(`Category ${product.category} not found for product ${product.name}`);
            }
        });

        const result = await Product.insertMany(products);
        console.log(`${result.length} products inserted`);
    }
    catch(error) {
        console.log(`error in inserting products : ${error.message}`);
    }
    finally {
        await mongoose.connection.close();
    }
}

insertProducts();