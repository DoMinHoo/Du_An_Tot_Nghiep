import { Router } from 'express';
const orderRouter = Router();

import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} from '../controllers/orderController.js';

// Tạo đơn hàng
orderRouter.post('/', createOrder);

// Lấy danh sách đơn theo user
orderRouter.get('/user/:userId', getOrdersByUser);

// Lấy đơn hàng theo ID
orderRouter.get('/:id', getOrderById);

// Cập nhật trạng thái đơn hàng
orderRouter.put('/:id/status', updateOrderStatus);

// Xoá đơn hàng
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;
