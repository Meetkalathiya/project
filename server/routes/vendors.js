import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Vendor from '../models/Vendor.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

// Register vendor
router.post('/register', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    const token = jwt.sign({ _id: vendor._id }, process.env.JWT_SECRET);
    res.status(201).json({ vendor, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login vendor
router.post('/login', async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ email: req.body.email });
    if (!vendor) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(req.body.password, vendor.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ _id: vendor._id }, process.env.JWT_SECRET);
    res.json({ vendor, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get vendor profile
router.get('/profile', auth, async (req, res) => {
  res.json(req.vendor);
});

export default router;