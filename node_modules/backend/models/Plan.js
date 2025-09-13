const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productType: { type: String, enum: ['Fibernet', 'Broadband Copper'], required: true },
  features: [{ type: String }],
  quota: { type: Number, required: true }, // monthly quota
  price: { type: Number, required: true },
  discounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discount' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plan', planSchema);