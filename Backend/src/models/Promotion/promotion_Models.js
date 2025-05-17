import mongoose from "mongoose";
import mongoossePaginate from "mongoose-paginate-v2";
// Promotion Schema
const promotionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: {
        type: String,
        enum: ['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'BUY_X_GET_Y', 'GIFT'],
        required: true
    },
    value: { type: Number, required: true }, // Giá trị giảm giá (% hoặc số tiền cố định)
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    usageLimit: { type: Number, default: null }, // null = không giới hạn
    usageCount: { type: Number, default: 0 },
    minOrderValue: { type: Number, default: 0 }, // Giá trị đơn hàng tối thiểu
    maxDiscountValue: { type: Number, default: null }, // Giới hạn số tiền giảm tối đa
    stackable: { type: Boolean, default: false }, // Có thể kết hợp với KM khác không
    priority: { type: Number, default: 0 }, // Độ ưu tiên khi có nhiều KM
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

promotionSchema.plugin(mongoossePaginate);
const PromotionModel = mongoose.model('Promotion', promotionSchema);

export default PromotionModel;

