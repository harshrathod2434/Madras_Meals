const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controllers/orderController');
const requireAuth = require('../middleware/authMiddleware');

// Protected routes

router.post('/', requireAuth, placeOrder); // ✅ token required
router.get('/', requireAuth, getOrders);   // ✅ token required

module.exports = router;
