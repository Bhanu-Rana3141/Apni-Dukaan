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
    },
    image : {
        type: String,
        required: true,
    },
    subcategories: [subcategorySchema],
}, {timeStamps:true});

module.exports = mongoose.model('Category', categorySchema);