    import mongoose from 'mongoose';

    const cartSchema = new mongoose.Schema(
    {
        user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
        cart_items: [
        {
            product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
            },
            quantity: {
            type: Number,
            required: true,
            min: 1,
            },
            added_price: {
            type: Number,
            required: true,
            min: 0,
            },
        },
        ],
    },
    { timestamps: true }
    );

    const Cart = mongoose.model('Cart', cartSchema);
    export default Cart;