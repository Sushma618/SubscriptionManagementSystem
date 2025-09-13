const express = require('express');
const router = express.Router();
const Log = require('../models/Log');
const { authenticate, authorize } = require('../middleware/auth');

// Get all logs (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  const logs = await Log.find().populate('user', 'email role').sort({ timestamp: -1 }).limit(100);
  res.json(logs);
});

module.exports = router;
