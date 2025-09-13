const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const Log = require('../models/Log');
const { authenticate, authorize } = require('../middleware/auth');

// Get user subscriptions
router.get('/', authenticate, async (req, res) => {
  const subs = await Subscription.find({ user: req.user._id }).populate('plan');
  res.json(subs);
});

// Subscribe to a plan
router.post('/subscribe', authenticate, async (req, res) => {
  const { planId, autoRenew } = req.body;
  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  const sub = new Subscription({ user: req.user._id, plan: planId, autoRenew, lastAction: 'subscribe' });
  await sub.save();
  // Log the action
  await Log.create({
    user: req.user._id,
    role: req.user.role,
    action: 'subscribe',
    details: `Subscribed to plan ${plan.name}`
  });
  res.json(sub);
});

// Upgrade/Downgrade subscription
router.post('/change', authenticate, async (req, res) => {
  const { subscriptionId, newPlanId } = req.body;
  const sub = await Subscription.findById(subscriptionId);
  if (!sub || sub.user.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Subscription not found' });
  const oldPlan = sub.plan;
  sub.plan = newPlanId;
  sub.lastAction = 'upgrade/downgrade';
  await sub.save();
  // Log the action
  await Log.create({
    user: req.user._id,
    role: req.user.role,
    action: 'upgrade/downgrade',
    details: `Changed plan from ${oldPlan} to ${newPlanId}`
  });
  res.json(sub);
});

// Cancel subscription
router.post('/cancel', authenticate, async (req, res) => {
  const { subscriptionId } = req.body;
  const sub = await Subscription.findById(subscriptionId);
  if (!sub || sub.user.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Subscription not found' });
  sub.status = 'cancelled';
  sub.lastAction = 'cancel';
  await sub.save();
  // Log the action
  await Log.create({
    user: req.user._id,
    role: req.user.role,
    action: 'cancel',
    details: `Cancelled subscription ${subscriptionId}`
  });
  res.json(sub);
});

// Renew subscription
router.post('/renew', authenticate, async (req, res) => {
  const { subscriptionId } = req.body;
  const sub = await Subscription.findById(subscriptionId);
  if (!sub || sub.user.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Subscription not found' });
  sub.status = 'active';
  sub.lastAction = 'renew';
  sub.endDate = null;
  await sub.save();
  // Log the action
  await Log.create({
    user: req.user._id,
    role: req.user.role,
    action: 'renew',
    details: `Renewed subscription ${subscriptionId}`
  });
  res.json(sub);
});

module.exports = router;