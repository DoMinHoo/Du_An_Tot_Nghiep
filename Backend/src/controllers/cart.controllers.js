    const Cart = require('../models/gio-hang.Models');
    const Product = require('../models/product.Models');

    // Thêm sản phẩm vào giỏ
    exports.addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(product_id);
        if (!product || product.stock < quantity) {
        return res.status(400).json({ message: "Sản phẩm không hợp lệ hoặc hết hàng" });
        }

        let cart = await Cart.findOne({ user_id: userId });

        if (!cart) {
        cart = new Cart({ user_id: userId, cart_items: [] });
        }

        const existingItem = cart.cart_items.find(item => item.product_id.equals(product_id));
        if (existingItem) {
        existingItem.quantity += quantity;
        } else {
        cart.cart_items.push({
            product_id,
            quantity,
            added_price: product.price
        });
        }

        await cart.save();
        res.json(cart);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Lấy giỏ hàng
    exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user_id: req.user._id }).populate('cart_items.product_id');
        res.json(cart || { cart_items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };

    // Cập nhật số lượng sản phẩm
    exports.updateItem = async (req, res) => {
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
    exports.removeItem = async (req, res) => {
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
    exports.clearCart = async (req, res) => {
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
