const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const InventoryItem = require('../models/InventoryItem');

// Get all orders for the logged-in user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.menuItem');
      
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// Place an order and deduct inventory
const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    let totalAmount = 0;
    const deductionMap = {};

    const sambharIngredients = [
      { name: 'Toor Dal', quantity: 50 },
      { name: 'Tamarind', quantity: 10 },
      { name: 'Tomatoes', quantity: 30 },
      { name: 'Mustard Seeds', quantity: 2 },
      { name: 'Curry Leaves', quantity: 2 },
      { name: 'Sambar Powder', quantity: 5 }
    ];

    const chutneyIngredients = [
      { name: 'Coconut', quantity: 50 },
      { name: 'Green Chillies', quantity: 2 },
      { name: 'Roasted Chana Dal', quantity: 10 },
      { name: 'Curry Leaves', quantity: 1 }
    ];

    const withSides = ['Idli', 'Plain Dosa', 'Masala Dosa', 'Medu Vada'];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) continue;

      totalAmount += menuItem.price * item.quantity;

      // Add main ingredients
      for (const ing of menuItem.ingredients) {
        deductionMap[ing.name] = (deductionMap[ing.name] || 0) + ing.quantity * item.quantity;
      }

      // Add sambhar + chutney ingredients if applicable
      if (withSides.includes(menuItem.name)) {
        for (const ing of [...sambharIngredients, ...chutneyIngredients]) {
          deductionMap[ing.name] = (deductionMap[ing.name] || 0) + ing.quantity * item.quantity;
        }
      }
    }

    // Update inventory
    for (const [name, quantity] of Object.entries(deductionMap)) {
      await InventoryItem.findOneAndUpdate(
        { name },
        { $inc: { quantity: -quantity } }
      );
    }

    // Create the order with user reference
    const newOrder = await Order.create({
      user: userId,
      items,
      totalAmount
    });

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder._id,
      totalAmount
    });

  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  placeOrder,
  getOrders
};
