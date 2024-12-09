import express from 'express';
import Bill from '../models/Bill.js';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create new bill
router.post('/', auth, async (req, res) => {
  try {
    const bill = new Bill({
      ...req.body,
      vendor: req.vendor._id
    });

    // Update product quantities
    for (const item of bill.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product ${item.product} not found`);
      }
      if (product.quantity < item.quantity) {
        throw new Error(`Insufficient quantity for product ${product.name}`);
      }
      product.quantity -= item.quantity;
      await product.save();
    }

    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get vendor's bills
router.get('/', auth, async (req, res) => {
  try {
    const bills = await Bill.find({ vendor: req.vendor._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;