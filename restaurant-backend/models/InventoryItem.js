const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true }, // in grams/ml
  unit: { type: String, default: 'grams' },
  threshold: { type: Number, default: 500 } // optional: for low stock alert
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
