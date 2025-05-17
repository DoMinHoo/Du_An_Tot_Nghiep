// controllers/promotionController.js
import PromotionModel from '../models/Promotion/promotion_Models.js';
import PromotionRule from '../models/Promotion/promotionRule_Model.js';


// Tạo mới chương trình khuyến mãi
async function createPromotion(req, res) {
    try {
        const {
            name,
            description,
            type,
            value,
            startDate,
            endDate,
            usageLimit,
            minOrderValue,
            maxDiscountValue,
            stackable,
            priority,
            rules
        } = req.body;

        // Validate input
        if (!name || !type || !value || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Kiểm tra logic thời gian
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: 'End date must be after start date'
            });
        }

        // Tạo promotion mới
        const promotion = new PromotionModel({
            name,
            description,
            type,
            value,
            startDate,
            endDate,
            usageLimit,
            minOrderValue,
            maxDiscountValue,
            stackable,
            priority
        });

        await promotion.save();

        // Tạo các rules nếu có
        if (rules && Array.isArray(rules)) {
            const promotionRule = rules.map(rule => ({
                promotionId: promotion._id,
                type: rule.type,
                conditions: rule.conditions
            }));

            await PromotionRule.insertMany(promotionRule);
        }

        res.status(201).json({
            success: true,
            data: promotion,
            message: 'Promotion created successfully'
        });
    } catch (error) {
        console.error('Error creating promotion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create promotion',
            error: error.message
        });
    }
}

async function getPromotions(req, res) {
    try {
        const {
            page = 1,
            limit = 10,
            isActive,
            type,
            startDate,
            endDate,
            search
        } = req.query;

        // Xây dựng query filter
        const filter = {};

        if (isActive !== undefined) {
            filter.isActive = isActive === 'true';
        }

        if (type) {
            filter.type = type;
        }

        if (startDate && endDate) {
            filter.$and = [
                { startDate: { $lte: new Date(endDate) } },
                { endDate: { $gte: new Date(startDate) } }
            ];
        } else if (startDate) {
            filter.startDate = { $gte: new Date(startDate) };
        } else if (endDate) {
            filter.endDate = { $lte: new Date(endDate) };
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Thực hiện query với phân trang
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };

        const promotions = await PromotionModel.paginate(filter, options);

        res.status(200).json({
            success: true,
            data: promotions,
            message: 'Promotions retrieved successfully'
        });
    } catch (error) {
        console.error('Error getting promotions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get promotions',
            error: error.message
        });
    }
}

async function updatePromotion(req, res) {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            type,
            value,
            startDate,
            endDate,
            isActive,
            usageLimit,
            minOrderValue,
            maxDiscountValue,
            stackable,
            priority,
            rules
        } = req.body;

        // Kiểm tra promotion tồn tại
        const promotion = await PromotionModel.findById(id);
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: 'Promotion not found'
            });
        }

        // Kiểm tra nếu promotion đã được sử dụng
        if (promotion.usageCount > 0 && (type !== promotion.type || value !== promotion.value)) {
            return res.status(400).json({
                success: false,
                message: 'Cannot change type or value of a promotion that has been used'
            });
        }

        // Cập nhật thông tin
        promotion.name = name || promotion.name;
        promotion.description = description || promotion.description;
        promotion.type = type || promotion.type;
        promotion.value = value || promotion.value;
        promotion.startDate = startDate || promotion.startDate;
        promotion.endDate = endDate || promotion.endDate;
        promotion.isActive = isActive !== undefined ? isActive : promotion.isActive;
        promotion.usageLimit = usageLimit !== undefined ? usageLimit : promotion.usageLimit;
        promotion.minOrderValue = minOrderValue !== undefined ? minOrderValue : promotion.minOrderValue;
        promotion.maxDiscountValue = maxDiscountValue !== undefined ? maxDiscountValue : promotion.maxDiscountValue;
        promotion.stackable = stackable !== undefined ? stackable : promotion.stackable;
        promotion.priority = priority !== undefined ? priority : promotion.priority;
        promotion.updatedAt = Date.now();

        await promotion.save();

        // Cập nhật rules nếu có
        if (rules && Array.isArray(rules)) {
            // Xóa rules cũ
            await PromotionRule.deleteMany({ promotionId: id });

            // Tạo rules mới
            const promotionRules = rules.map(rule => ({
                promotionId: promotion._id,
                type: rule.type,
                conditions: rule.conditions
            }));

            await PromotionRule.insertMany(promotionRules);
        }

        res.status(200).json({
            success: true,
            data: promotion,
            message: 'Promotion updated successfully'
        });
    } catch (error) {
        console.error('Error updating promotion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update promotion',
            error: error.message
        });
    }
}
async function deletePromotions(req, res) {
    try {
        const { id } = req.params;

        // Kiểm tra promotion tồn tại
        const promotion = await PromotionModel.findById(id);
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: 'Promotion not found'
            });
        }

        // Kiểm tra nếu promotion đã được sử dụng
        if (promotion.usageCount > 0) {
            // Thay vì xóa, chỉ đánh dấu là không active
            promotion.isActive = false;
            promotion.updatedAt = Date.now();
            await promotion.save();

            return res.status(200).json({
                success: true,
                message: 'Promotion has been deactivated instead of deleted because it has been used'
            });
        }

        // // Xóa các rules liên quan
        // await PromotionRule.deleteMany({ promotionId: id });

        // Xóa promotion
        await PromotionModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Promotion deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting promotion:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete promotion',
            error: error.message
        });
    }
}
export {
    createPromotion,
    getPromotions,
    updatePromotion,
    deletePromotions
};