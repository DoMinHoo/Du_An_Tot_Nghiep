import CouponModel from "../models/couponModel.js";
import PromotionModel from "../models/Promotion/promotion_Models.js";
// Hàm kiểm tra validation
const validateCoupon = ({ code, promotion, startDate, endDate, value }) => {
    const errors = [];

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
        errors.push('Mã giảm giá là bắt buộc và không được để trống.');
    }

    if (!promotion) {
        errors.push('Chương trình khuyến mãi là bắt buộc.');
    }

    if (!startDate || !(new Date(startDate) instanceof Date)) {
        errors.push('Ngày bắt đầu là bắt buộc và phải là kiểu Date hợp lệ.');
    }

    if (!endDate || !(new Date(endDate) instanceof Date)) {
        errors.push('Ngày kết thúc là bắt buộc và phải là kiểu Date hợp lệ.');
    }

    if (!value || typeof value !== 'number' || value <= 0) {
        errors.push('Giá trị giảm giá phải là một số dương.');
    }

    return errors;
};


// Lấy tất cả coupon
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await CouponModel.find();
        res.json(coupons);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy coupon!" });
    }
};

// Thêm coupon mới
export const createCoupon = async (req, res) => {
    // Validate các trường coupon
    const validationErrors = validateCoupon(req.body);

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        // Kiểm tra xem giá trị của valueType có hợp lệ không (nếu không, mặc định là 'fixed')
        const valueType = req.body.valueType === 'percentage' || req.body.valueType === 'fixed'
            ? req.body.valueType
            : 'fixed'; // Default 'fixed' nếu không có giá trị hợp lệ

        // Lấy promotion theo tên (hoặc ID nếu bạn đã có)
        const promotion = await PromotionModel.findOne({ name: req.body.promotion });

        if (!promotion) {
            return res.status(404).json({ error: "Không tìm thấy chương trình khuyến mãi!" });
        }

        // Thêm _id của promotion vào body
        req.body.promotion = promotion._id;

        // Thêm giá trị valueType vào body
        req.body.valueType = valueType;

        const coupon = new CouponModel(req.body);
        const savedCoupon = await coupon.save();
        res.status(201).json(savedCoupon);
    } catch (err) {
        console.error('Error creating coupon:', err);
        res.status(500).json({
            success: false,
            message: 'Không thể tạo coupon',
            error: err.message
        });
    }
};
// Lấy chi tiết coupon theo ID
export const getOneCoupon = async (req, res) => {
    try {
        const coupon = await CouponModel.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({ error: "Không tìm thấy coupon!" });
        }

        res.json(coupon);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy chi tiết coupon!" });
    }
};

// Cập nhật coupon
export const updateCoupon = async (req, res) => {
    const validationErrors = validateCoupon(req.body);

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        const updatedCoupon = await CouponModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ error: "Không tìm thấy coupon để cập nhật!" });
        }

        res.json(updatedCoupon);
    } catch (err) {
        res.status(400).json({ error: "Không thể cập nhật coupon!" });
    }
};

// Xóa coupon
export const deleteCoupon = async (req, res) => {
    try {
        const deletedCoupon = await CouponModel.findByIdAndDelete(req.params.id);

        if (!deletedCoupon) {
            return res.status(404).json({ error: "Không tìm thấy coupon để xóa!" });
        }

        res.json({ message: "Đã xóa coupon!" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi xóa coupon!" });
    }
};
