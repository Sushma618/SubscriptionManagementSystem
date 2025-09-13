const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  details: { type: String },
  role: { type: String, enum: ['user', 'admin'] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);