const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const { authenticate, authorize } = require('../middleware/auth');

// Get all plans
router.get('/', authenticate, async (req, res) => {
  const plans = await Plan.find({ isActive: true });
  res.json(plans);
});

// Admin: create plan
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const plan = new Plan(req.body);
  await plan.save();
  res.json(plan);
});

// Admin: update plan
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plan);
});

// Admin: delete plan
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted' });
});

module.exports = router;