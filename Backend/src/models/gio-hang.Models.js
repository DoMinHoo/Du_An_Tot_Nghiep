const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // hoặc tên bảng sản phẩm của bạn
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false }); // không cần _id riêng cho từng cart item

const gioHangSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // bảng người dùng
        required: true
    },
    cart_items: {
        type: [cartItemSchema],
        required: true,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model("Cart", gioHangSchema);
