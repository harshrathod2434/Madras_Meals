const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/InventoryItem');

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
});

module.exports = router;
    