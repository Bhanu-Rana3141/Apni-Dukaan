const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


/* FLOW OF EXECUTION

1. Destructuring category name from url
2. try block 
* finding destructed categoryName if present in categories collection
* if not present return NOT FOUND
* as product collection refers category collection, finding product by finding category : category._id
* if no products found return status 200
* return products
3. catch block - to catch error in fetching products
4. export module
*/
const getProductsByCategory = async (req, res) => {
    const { categoryName } = req.params; 


    try {
        // Find category using a regular expression for case-insensitive search
        const category = await Category.findOne({name : { $regex: new RegExp(`^${categoryName}$`, 'i') }});
        

        if(!category) {
            return res.status(404).json({message: 'category not found'})
        }

        const products  = await Product.find({category : category._id});
        
        if(products.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(products);
    }
    catch(error) {
        console.error("Error fetching products:", error); 
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = { getAllCategories , getProductsByCategory};