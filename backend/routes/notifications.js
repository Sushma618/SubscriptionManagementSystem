const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Simulated notifications (alerts, offers)
router.get('/', authenticate, async (req, res) => {
  // Mocked: return sample notifications
  res.json([
    { type: 'alert', message: 'Your subscription will renew soon.' },
    { type: 'offer', message: '20% off on Fibernet plans this month!' }
  ]);
});

module.exports = router;