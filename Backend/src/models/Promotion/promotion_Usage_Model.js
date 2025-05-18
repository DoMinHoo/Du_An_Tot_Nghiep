import mongoose from "mongoose";

const promotionUsageSchema = new mongoose.Schema({
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    couponCode: { type: String, default: null },
    discountAmount: { type: Number, required: true },
    usedAt: { type: Date, default: Date.now }
});

export const PromotionUsage = mongoose.model('PromotionUsage', promotionUsageSchema);