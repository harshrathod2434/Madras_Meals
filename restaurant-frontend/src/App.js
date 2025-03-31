import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/contact';
import Footer from './components/Footer';
import MenuGrid from './components/MenuGrid';
import FloatingCart from './components/FloatingCart';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.menuItem !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      setCart(cart.filter(item => item.menuItem !== id));
    } else {
      setCart(cart.map(item =>
        item.menuItem === id
          ? { ...item, quantity: newQty }
          : item
      ));
    }
  };

  const placeOrder = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to place an order.');
      return;
    }
  
    const payload = {
      items: cart.map(({ menuItem, quantity }) => ({ menuItem, quantity }))
    };
  
    fetch('http://localhost:5001/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        alert(`✅ Order placed!\nTotal: ₹${data.totalAmount}`);
        setCart([]);
      })
      .catch(() => alert('❌ Order failed!'));
  };
  

  // 👇 Auto-login on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
        })
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  // 👇 Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={cart.length} user={user} handleLogout={handleLogout} />

      <main className="flex-1">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />

        <Route path="/" element={
          <>
            <Hero />
            <MenuGrid cart={cart} setCart={setCart} />
            <About />
            <Contact />
          </>
        } />

        <Route path="/cart" element={
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            placeOrder={placeOrder}
            updateQuantity={updateQuantity}
          />
        } />

        <Route path="/orders" element={
          <PrivateRoute user={user}>
            <OrdersPage />
          </PrivateRoute>
        } />
      </Routes>

      {cart.length > 0 && <FloatingCart cart={cart} />}
      </main>
      <Footer />
      
    </div>
  );
}

export default App;
