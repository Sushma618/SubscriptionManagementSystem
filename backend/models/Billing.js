const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  billing_id: Number,
  subscription_id: Number,
  amount: Number,
  billing_date: Date,
  payment_status: String,
});

module.exports = mongoose.model('Billing', billingSchema);