import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  product_id: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const shippingAddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const orderSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  order_items: {
    type: [orderItemSchema],
    required: true
  },
  total_price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment_status: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  shipping_address: {
    type: shippingAddressSchema,
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now
  },
  shipping_date: {
    type: Date
  },
  delivery_date: {
    type: Date
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
