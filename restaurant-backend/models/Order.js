const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  totalAmount: Number,
  status: { type: String, default: 'Placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);


