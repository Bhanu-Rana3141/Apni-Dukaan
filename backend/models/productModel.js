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
        required: true,
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
}, 
{timestamps : true}
);

module.exports = mongoose.model('Product', productSchema);