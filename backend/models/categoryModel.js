const mongoose = require('mongoose');

const categorySchema = mongoose.Schema( {
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
    subcategories: [String], 
}, {timeStamps:true} );

module.exports = mongoose.model('Category', categorySchema);