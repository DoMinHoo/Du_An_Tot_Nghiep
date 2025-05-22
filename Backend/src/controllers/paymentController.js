import Payment from '../models/paymentModel.js';
import Order from '../models/orderModel.js';
import crypto from 'crypto';
// POST /api/payments
export const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, paymentProvider } = req.body;
        const transactionId = 'txn_' + crypto.randomBytes(8).toString('hex');
        const userId = req.user.id; // Đảm bảo bạn có middleware xác thực

        // Kiểm tra đơn hàng
        const order = await Order.findById(orderId);
        if (!order || order.user_id.toString() !== userId) {
            return res.status(404).json({ message: 'Order not found or not authorized' });
        }

        if (order.status === 'PAID') {
            return res.status(400).json({ message: 'Order already paid' });
        }

        const payment = await Payment.create({
            orderId,
            userId,
            amount: order.total_price,
            paymentMethod,
            paymentProvider: paymentMethod === 'ONLINE' ? paymentProvider : null,
            transactionId, // ✅ Gán mã mới tạo
            status: 'PENDING',
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
            deviceInfo: req.body.deviceInfo || {}
        });

        res.status(201).json({
            success: true,
            message: 'Payment created',
            data: payment
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// GET /api/payments/:id
export const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('orderId');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.json({
            success: true,
            data: payment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// GET /api/users/:userId/payments
export const getMyPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: payments.length,
            data: payments
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// POST /api/payments/webhook
export const paymentWebhook = async (req, res) => {
    try {
        const { transactionId, status, orderId, amount } = req.body;

        if (!transactionId || !status || !orderId || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const payment = await Payment.findOne({ transactionId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.status === 'COMPLETED') {
            return res.status(200).json({ message: 'Payment already completed' });
        }

        if (status === 'SUCCESS') {
            payment.status = 'COMPLETED';
            payment.completedAt = new Date();
            await payment.save();

            const order = await Order.findById(orderId);
            if (order && order.status !== 'PAID') {
                order.status = 'PAID';
                await order.save();
            }
        } else if (status === 'FAILED') {
            payment.status = 'FAILED';
            payment.errorMessage = 'Payment failed from provider';
            await payment.save();
        }

        res.status(200).json({ success: true, message: 'Payment status updated' });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ message: 'Webhook processing failed', error: error.message });
    }
};
