import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const MenuGrid = ({ cart, setCart }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/menu')
      .then((res) => setMenu(res.data))
      .catch((err) => console.error('Menu fetch error:', err));
  }, []);

  const addToCart = (item) => {
    const exists = cart.find(ci => ci.menuItem === item._id);
    if (exists) {
      setCart(cart.map(ci =>
        ci.menuItem === item._id
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci
      ));
    } else {
      setCart([...cart, {
        menuItem: item._id,
        quantity: 1,
        name: item.name,
        price: item.price
      }]);
    }
  };

  return (
    <section id="menu" className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {menu.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`/images/${item.name.toLowerCase().replace(/\s/g, '-')}.jpg`}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-xl shadow-sm mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              {item.name} <span className="text-sm text-gray-600">– ₹{item.price}</span>
            </h2>
            <button
              onClick={() => addToCart(item)}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              ➕ Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
