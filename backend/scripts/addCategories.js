const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const Category = require('../models/categoryModel');
const categoriesData = require('../data/categories.json');


const addCategories = async () => {
    try {
        await connectDB();
        const result = await Category.insertMany(categoriesData);
        console.log(`${result.length} categories inserted`);
    }
    catch(error) {
        console.log(`error in inserting categories : ${error.message}`);
    }
    finally {
        mongoose.connection.close();
    }
}

addCategories();