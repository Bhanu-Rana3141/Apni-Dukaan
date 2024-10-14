const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema(
    {
      name: {
        type: String,
      },
    },
    { _id: false }
);

const categorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    image : {
        type: String,
        required: true,
    },
    // array of subcategories
    subcategories: [subcategorySchema], 
}, {timeStamps:true});

module.exports = mongoose.model('Category', categorySchema);