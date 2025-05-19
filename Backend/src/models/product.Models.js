    // models/Product.js
    import mongoose from 'mongoose';

    const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: [String], // Mảng URL ảnh, phù hợp frontend hiển thị carousel
        default: []
    },
    stock_quantity: {
        type: Number,
        required: true,
        min: 0
    },
    color: {
        type: String,
        trim: true
    },
    material: {
        type: String,
        trim: true
    },
    size: {
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
    });

    // Auto-update updated_at mỗi lần save
    productSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
    });

    const Product = mongoose.model('Product', productSchema);

    export default Product;
