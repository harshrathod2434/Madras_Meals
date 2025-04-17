const bcrypt = require('bcryptjs');
const jwt   = require('jsonwebtoken');
const User  = require('../models/User');

// Register (unchanged)
const registerUser = async (req, res) => {
  // … your existing code …
};

// Login for regular users
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    // Include isAdmin here
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Login for admins only
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isAdmin: true });
    if (!user) return res.status(400).json({ message: 'Not an admin' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, isAdmin: true }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // Include isAdmin here too
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: true
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};

// New: Get current user (for /api/auth/me)
const getCurrentUser = (req, res) => {
  const user = req.user;  // set by protect middleware
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  getCurrentUser     // <-- export it
};
