const Category = require('../models/categoryModel');

/*
    * Category.find({}): Fetches all documents from the categories collection without any filters (empty {}).
    * res.status(200): Sets the HTTP response status to 200 (OK) , .json(categories): Sends the retrieved categories as a JSON response to the client.
    * catch (error): Catches any errors that occur during the database operation 
    * .res.status(500): Sends a 500 (Internal Server Error) HTTP response.
    *  message: 'Server Error': A general error message for the client. error: error.message: The specific error message for debugging.
*/

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = { getAllCategories };