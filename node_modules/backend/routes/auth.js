const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Simulated login

// Role/status aware login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (user.status === 'inactive') return res.status(403).json({ message: 'Account is inactive. Please contact support.' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'lumen_secret', { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status, phone: user.phone } });
});


// Register with all info
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone, status } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  user = new User({ name, email, password: hashed, role, phone, status: status || 'active' });
  await user.save();
  res.json({ message: 'User registered' });
});

module.exports = router;