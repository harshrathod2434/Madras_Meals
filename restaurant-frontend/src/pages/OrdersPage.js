// src/pages/OrdersPage.js



import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("JWT token:", token);
    const token = localStorage.getItem('token');
    if (!token) return;
  
    fetch('http://localhost:5001/api/orders/myorders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => setOrders([]));
  }, []);
  

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">📋 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {Array.isArray(orders) && orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-500 mb-2">
                <strong>Order ID:</strong> {order._id}
              </p>
              <ul className="text-gray-800 mb-4 space-y-1">
                {order.items.map((item, idx) => (
                  <li key={idx} className="text-sm">
                    🍽️ {item.menuItem?.name || 'Unknown item'} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-semibold">Total: ₹{order.totalAmount}</p>
              <p className="text-sm text-green-600 mt-1">Status: {order.status || 'Placed'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
