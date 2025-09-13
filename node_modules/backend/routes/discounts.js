const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');
const { authenticate, authorize } = require('../middleware/auth');

// Get all discounts
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  const discounts = await Discount.find();
  res.json(discounts);
});

// Create discount
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const discount = new Discount(req.body);
  await discount.save();
  res.json(discount);
});

// Update discount
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(discount);
});

// Delete discount
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  await Discount.findByIdAndDelete(req.params.id);
  res.json({ message: 'Discount deleted' });
});

module.exports = router;
