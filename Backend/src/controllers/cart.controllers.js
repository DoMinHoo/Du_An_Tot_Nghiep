import Cart from '../models/gio-hang.Models';
import Product from '../models/productModel';
import mongoose from 'mongoose';
// Thêm sản phẩm vào giỏ
    export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const userId = req.user_id; 
    try {
        // Validate inputs
        if (!mongoose.isValidObjectId(product_id)) {
        return res.status(400).json({ message: 'ID sản phẩm không hợp lệ' });
        }
        if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Số lượng phải là số nguyên lớn hơn 0' });
        }
        if (!userId) {
        return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập' });
        }

        // Check product existence and stock
        const product = await Product.findById(product_id);
        if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        if (product.stock_quantity < quantity) {
        return res.status(400).json({ message: 'Số lượng yêu cầu vượt quá tồn kho' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
        cart = new Cart({ user_id: userId, cart_items: [] });
        }

        // Check for existing item
        const existingItem = cart.cart_items.find((item) =>
        item.product_id.equals(product_id)
        );
        if (existingItem) {
        existingItem.quantity += quantity;
        } else {
        cart.cart_items.push({
            product_id: new mongoose.Types.ObjectId(product_id),
            quantity,
            added_price: product.price,
        });
        }

        // Save cart and populate product details for response
        await cart.save();
        const populatedCart = await Cart.findById(cart._id).populate('cart_items.product_id');
        res.status(200).json(populatedCart);
    } catch (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
    };

// Lấy giỏ hàng
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user._id }).populate('cart_items.product_id');
        res.json(cart || { cart_items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Cập nhật số lượng sản phẩm
export const updateItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user_id: req.user._id });
        const item = cart.cart_items.find(i => i.product_id.equals(productId));

        if (!item) return res.status(404).json({ message: "Không tìm thấy sản phẩm trong giỏ" });

        if (quantity <= 0) {
            cart.cart_items = cart.cart_items.filter(i => !i.product_id.equals(productId));
        } else {
            item.quantity = quantity;
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xoá sản phẩm
export const removeItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user._id });
        cart.cart_items = cart.cart_items.filter(item => !item.product_id.equals(req.params.productId));
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xoá toàn bộ giỏ hàng
export const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndUpdate(
            { user_id: req.user._id },
            { cart_items: [] }
        );
        res.json({ message: "Đã xoá toàn bộ giỏ hàng" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
