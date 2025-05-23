import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Coupon Schema
const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Mã giảm giá
    description: { type: String }, // Mô tả của coupon
    promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' }, // Liên kết tới chương trình khuyến mãi (Promotion)
    startDate: { type: Date, required: true }, // Ngày bắt đầu áp dụng coupon
    endDate: { type: Date, required: true }, // Ngày kết thúc coupon
    isActive: { type: Boolean, default: true }, // Trạng thái của coupon (có hiệu lực hay không)
    usageLimit: { type: Number, default: null }, // Số lần sử dụng tối đa, null là không giới hạn
    usageCount: { type: Number, default: 0 }, // Số lần coupon đã được sử dụng
    maxUsagePerCustomer: { type: Number, default: 1 }, // Số lần sử dụng tối đa của mỗi khách hàng
    minOrderValue: { type: Number, default: 0 }, // Giá trị đơn hàng tối thiểu để áp dụng coupon
    maxDiscountValue: { type: Number, default: null }, // Giới hạn giảm giá tối đa
    stackable: { type: Boolean, default: false }, // Có thể kết hợp với các chương trình khuyến mãi khác không
    priority: { type: Number, default: 0 }, // Độ ưu tiên khi có nhiều coupon
    createdAt: { type: Date, default: Date.now }, // Thời gian tạo coupon
    updatedAt: { type: Date, default: Date.now }, // Thời gian cập nhật coupon
    value: { type: Number, required: true }, // Giá trị giảm giá của coupon
    valueType: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'], // Chỉ nhận giá trị 'percentage' hoặc 'fixed'
        default: 'fixed'
    }

    // customerGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerGroup' }] // Nhóm khách hàng có thể sử dụng coupon này
});

// Sử dụng pagination cho model Coupon
couponSchema.plugin(mongoosePaginate);

// Model
const CouponModel = mongoose.model('Coupon', couponSchema);

export default CouponModel;
