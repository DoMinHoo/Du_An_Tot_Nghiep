import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
    // Thông tin cơ bản
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        required: true,
        default: 'VND'
    },

    // Chỉ cho phép 2 loại phương thức thanh toán: COD hoặc ONLINE
    paymentMethod: {
        type: String,
        required: true,
        enum: ['COD', 'ONLINE']
    },

    // Nếu là ONLINE thì provider là bắt buộc (Stripe, Momo,...)
    paymentProvider: {
        type: String,
        required: function () {
            return this.paymentMethod === 'ONLINE';
        },
        enum: ['MOMO', 'ZALOPAY', null]
    },

    // Trạng thái thanh toán
    status: {
        type: String,
        required: true,
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED', 'CANCELLED'],
        default: 'PENDING'
    },
    transactionId: {
        type: String,
        sparse: true
    },
    paymentIntentId: String,

    // Thông tin bổ sung
    ipAddress: String,
    userAgent: String,
    deviceInfo: Schema.Types.Mixed,

    // Danh sách hoàn tiền (nếu có)
    refunds: [{
        amount: { type: Number, required: true, min: 0 },
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
            default: 'PENDING'
        },
        refundId: String,
        createdAt: { type: Date, default: Date.now }
    }],

    errorCode: String,
    errorMessage: String,
    attemptCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    completedAt: Date
}, {
    timestamps: { createdAt: false, updatedAt: true }
});

// Indexes
paymentSchema.index({ orderId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 }, { sparse: true });
paymentSchema.index({ createdAt: 1 });

// Middleware cập nhật updatedAt
paymentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
