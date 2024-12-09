import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  // vendor: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Vendor',
  //   required: true
  // }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);