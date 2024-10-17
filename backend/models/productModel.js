const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type: String,
        trim: true,
    },
    price : {
        type: Number,
        required: true,
        min: [0],
    },
    quantity : {
        type: String, 
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required : true,
    },
    subcategory : {
        type: String,
        trim: true,
    },
    stock : {
        type: Number,
        required: true,
        min: [0],
        default: 0,
    },
}, 
{timestamps : true}
);

module.exports = mongoose.model('Product', productSchema);