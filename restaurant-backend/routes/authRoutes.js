const express = require('express');
const router  = express.Router();
const protect = require('../middleware/authMiddleware');         // ← import auth middleware
const {
  registerUser,
  loginUser,
  adminLogin,
  getCurrentUser   // ← import our new controller
} = require('../controllers/authController');

// User routes
router.post('/register', registerUser);
router.post('/login',    loginUser);

// Admin Login route
router.post('/admin-login', adminLogin);

// New “who am I” route
router.get('/me', protect, getCurrentUser);

module.exports = router;
