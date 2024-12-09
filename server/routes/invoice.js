const express = require('express');
const router = express.Router();
const Invoice = require('./models/Invoice'); // Path to the Invoice model

router.post('/api/invoices', async (req, res) => {
  try {
    const { customerName, products, totalAmount, paymentMethod } = req.body;

    // Validation check
    if (!customerName || !products || !Array.isArray(products) || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: 'Invalid invoice data' });
    }

    // Create a new invoice
    const newInvoice = new Invoice({
      customerName,
      products,
      totalAmount,
      paymentMethod,
      status: 'pending'
    });

    // Save to the database
    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
