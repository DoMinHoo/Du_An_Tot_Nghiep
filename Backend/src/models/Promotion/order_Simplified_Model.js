import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Giá tại thời điểm mua
        discount: { type: Number, default: 0 } // Giảm giá trên từng sản phẩm
    }],
    subtotal: { type: Number, required: true }, // Tổng tiền trước khuyến mãi
    discount: { type: Number, default: 0 }, // Tổng giảm giá
    total: { type: Number, required: true }, // Tổng tiền sau khuyến mãi
    appliedPromotions: [{
        promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
        couponCode: { type: String, default: null },
        discountAmount: { type: Number, required: true }
    }],
    status: {
        type: String,
        enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model('Order', orderSchema);