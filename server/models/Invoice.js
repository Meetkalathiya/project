import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  products: [{
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    priceAtPurchase: {
      type: Number,
      required: true,
    },
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'online'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Invoice', invoiceSchema);
