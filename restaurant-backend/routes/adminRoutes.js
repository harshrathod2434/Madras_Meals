const express = require('express');
const router  = express.Router();
const Dish    = require('../models/MenuItem');
const protect = require('../middleware/authMiddleware');

// Get all dishes (you may already have this)
router.get('/dishes', protect, async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// Add this: Update a dish
router.put('/dishes/:id', protect, async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a dish
router.delete('/dishes/:id', protect, async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: 'Dish deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
