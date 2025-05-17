import categoryModel from "../models/category.model.js";

// Hàm kiểm tra validation
const validateCategory = ({ name, description }) => {
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Tên danh mục là bắt buộc và không được để trống.');
    } else if (name.trim().length < 5) {
        errors.push('Tên danh mục phải có ít nhất 5 ký tự.');
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
        errors.push('Mô tả danh mục là bắt buộc và không được để trống.');
    }

    return errors;
};

// Lấy tất cả danh mục
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy danh mục!" });
    }
};

// Thêm danh mục mới
export const createCategory = async (req, res) => {
    const validationErrors = validateCategory(req.body);

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        const category = new categoryModel(req.body);
        const saved = await category.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).json({
            success: false,
            message: 'Không thể tạo danh mục',
            error: err.message
        });
    }
};

// Lấy chi tiết danh mục theo ID
export const getOneCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Không tìm thấy danh mục!" });
        }

        res.json(category);
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi lấy chi tiết danh mục!" });
    }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
    const validationErrors = validateCategory(req.body);

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    try {
        const updated = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ error: "Không tìm thấy danh mục để cập nhật!" });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Không thể cập nhật danh mục!" });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    try {
        const deleted = await categoryModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Không tìm thấy danh mục để xóa!" });
        }

        res.json({ message: "Đã xóa danh mục!" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi khi xóa danh mục!" });
    }
};
