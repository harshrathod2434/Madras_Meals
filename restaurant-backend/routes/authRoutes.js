const express = require('express');

const router = express.Router();
const { registerUser, loginUser, adminLogin } = require('../controllers/authController');

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin Login route
router.post('/admin-login', adminLogin);

module.exports = router;
