import mongoose from "mongoose";

const promotionRuleSchema = new mongoose.Schema({
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', required: true },
    type: {
        type: String,
        enum: ['PRODUCT', 'CATEGORY', 'CUSTOMER', 'CART_VALUE', 'TIME', 'LOCATION'],
        required: true
    },
    conditions: { type: mongoose.Schema.Types.Mixed, required: true },
    // Ví dụ conditions:
    // Với type = 'PRODUCT': { productIds: ['id1', 'id2'], includeAll: false }
    // Với type = 'CATEGORY': { categoryIds: ['id1', 'id2'] }
    // Với type = 'CUSTOMER': { customerTypes: ['VIP', 'NEW'], minOrderCount: 5 }
    // Với type = 'CART_VALUE': { minValue: 100, maxValue: 1000 }
    // Với type = 'TIME': { daysOfWeek: [1, 2, 3], hoursOfDay: [9, 10, 11, 12] }
    // Với type = 'LOCATION': { countries: ['VN'], cities: ['HCM', 'HN'] }
    createdAt: { type: Date, default: Date.now }
});

export const PromotionRule = mongoose.model('PromotionRule', promotionRuleSchema);