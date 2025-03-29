const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);

// Routes (you’ll import these later)
app.get('/', (req, res) => {
  res.send('Restaurant API running');
});

module.exports = app;



