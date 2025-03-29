const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true } // in grams or ml
});

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // optional, for future use
  ingredients: [ingredientSchema]
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
