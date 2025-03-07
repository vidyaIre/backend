const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
    }
);

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;