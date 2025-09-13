const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

// Admin: analytics dashboard
router.get('/summary', authenticate, authorize('admin'), async (req, res) => {
  const totalActive = await Subscription.countDocuments({ status: 'active' });
  const totalCancelled = await Subscription.countDocuments({ status: 'cancelled' });
  const plans = await Plan.find();
  const planStats = await Promise.all(plans.map(async plan => {
    const count = await Subscription.countDocuments({ plan: plan._id });
    return { plan: plan.name, count };
  }));
  res.json({ totalActive, totalCancelled, planStats });
});

// Trends (monthly/yearly)

const Billing = require('../models/Billing');

router.get('/trends', authenticate, authorize('admin'), async (req, res) => {
  try {
    // Monthly subscriptions (count by month for current year)
    const now = new Date();
    const year = now.getFullYear();
    const monthly = Array(12).fill(0);
    const monthlyRevenue = Array(12).fill(0);
    const subs = await Subscription.find({ startDate: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) } });
    subs.forEach(sub => {
      const m = sub.startDate.getMonth();
      monthly[m]++;
    });
    // Revenue by month (paid billings)
    const billings = await Billing.find({ payment_status: 'paid', billing_date: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) } });
    billings.forEach(bill => {
      const m = bill.billing_date.getMonth();
      monthlyRevenue[m] += bill.amount;
    });
    // Yearly subscriptions (count by year)
    const yearly = {};
    const yearlyRevenue = {};
    const allSubs = await Subscription.find({});
    allSubs.forEach(sub => {
      const y = sub.startDate.getFullYear();
      yearly[y] = (yearly[y] || 0) + 1;
    });
    const allBillings = await Billing.find({ payment_status: 'paid' });
    allBillings.forEach(bill => {
      const y = bill.billing_date.getFullYear();
      yearlyRevenue[y] = (yearlyRevenue[y] || 0) + bill.amount;
    });
    // Format yearly arrays for last 5 years
    const years = Array.from({length: 5}, (_, i) => year - 4 + i);
    const yearlyArr = years.map(y => yearly[y] || 0);
    const yearlyRevenueArr = years.map(y => yearlyRevenue[y] || 0);
    res.json({
      monthly,
      yearly: yearlyArr,
      monthlyRevenue,
      yearlyRevenue: yearlyRevenueArr
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load analytics trends' });
  }
});

module.exports = router;