const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');
const { authenticate } = require('../middleware/auth');

// Simulated AI-based recommendations (mocked)
const Subscription = require('../models/Subscription');
const Billing = require('../models/Billing');

// Enhanced: Recommend plans based on user's failed renewals, paused/cancelled status, and billing issues
router.get('/', authenticate, async (req, res) => {
  try {
    // Get user's subscriptions and billing
    const subs = await Subscription.find({ user: req.user._id }).populate('plan');
    const billings = await Billing.find({});
    // If user has many renew_failed, paused, or failed payments, suggest cheaper/more reliable plans
    let churnRisk = false;
    let failedRenewals = 0;
    let failedPayments = 0;
    subs.forEach(sub => {
      if (sub.status === 'paused' || sub.status === 'cancelled') churnRisk = true;
      if (sub.lastAction && sub.lastAction.includes('renew_failed')) failedRenewals++;
      // Check billing failures for this subscription
      billings.forEach(bill => {
        if (bill.subscription_id === sub._id && bill.payment_status === 'failed') failedPayments++;
      });
    });
    // Recommend logic
    let plans = await Plan.find({ isActive: true });
    let recommended = [];
    if (churnRisk || failedRenewals > 1 || failedPayments > 1) {
      // Suggest cheapest plan
      plans = plans.sort((a, b) => a.price - b.price);
      recommended.push(plans[0]);
    } else {
      // Suggest most popular plan (by number of subscriptions)
      const planCounts = {};
      const allSubs = await Subscription.find({});
      allSubs.forEach(s => {
        planCounts[s.plan] = (planCounts[s.plan] || 0) + 1;
      });
      plans = plans.sort((a, b) => (planCounts[b._id] || 0) - (planCounts[a._id] || 0));
      recommended.push(plans[0]);
    }
    res.json(recommended);
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
});

module.exports = router;