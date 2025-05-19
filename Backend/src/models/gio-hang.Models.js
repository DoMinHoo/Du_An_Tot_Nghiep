import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    added_price: Number, // giá tại thời điểm thêm vào
}, { _id: false });

const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        unique: true, // 1 user chỉ có 1 giỏ
    },
    cart_items: {
        type: [cartItemSchema],
        default: [],
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;
