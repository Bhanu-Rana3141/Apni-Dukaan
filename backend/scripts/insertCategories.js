const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const Category = require('../models/categoryModel');
const categories = require('../data/categories.json');


const insertCategories = async () => {
    try {
        await connectDB();

        await Category.deleteMany({});

        const result = await Category.insertMany(categories);
        console.log(`${result.length} categories inserted`);
    }
    catch(error) {
        console.log(`error in inserting categories : ${error.message}`);
    }
    finally {
        await mongoose.connection.close();
    }
}

insertCategories();