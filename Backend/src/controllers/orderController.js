import Order from '../models/orderModel.js';

// Tạo đơn hàng mới
export async function createOrder(req, res) {
  try {
    const {
      user_id,
      order_items,
      shipping_address,
      payment_status,
      status,
      shipping_date,
      delivery_date
    } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!user_id || !order_items || !Array.isArray(order_items) || order_items.length === 0 || !shipping_address) {
      return res.status(400).json({ message: 'Missing required fields: user_id, order_items, shipping_address' });
    }

    // Tính tổng tiền
    const total_price = order_items.reduce((sum, item) => {
      if (!item.price || !item.quantity) throw new Error("Each item must have 'price' and 'quantity'");
      return sum + item.quantity * item.price;
    }, 0);

    const order = await Order.create({
      user_id,
      order_items,
      total_price,
      shipping_address,
      payment_status,
      status,
      shipping_date,
      delivery_date
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}

// Lấy tất cả đơn hàng của 1 người dùng
export async function getOrdersByUser(req, res) {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user_id: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
}

// Lấy đơn hàng theo ID
export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
}

// Cập nhật trạng thái đơn hàng
export async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
}

// Xoá đơn hàng
export async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
}
