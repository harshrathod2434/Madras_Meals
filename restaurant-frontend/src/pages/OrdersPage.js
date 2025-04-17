import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:5001/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched orders:", data);
        // Assuming the API returns { orders: [...] }
        const parsedOrders = Array.isArray(data.orders) ? data.orders : [];
        setOrders(parsedOrders);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      });
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">📋 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow relative">
              <div className="flex justify-between mb-4 text-sm text-gray-800">
                <div>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      🍽️ {item.menuItem?.name || 'Unknown item'} × {item.quantity}
                    </div>
                  ))}
                </div>
                <div className="text-right text-gray-500">
                  <div>{new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</div>
                  <div>{new Date(order.createdAt).toLocaleTimeString('en-IN', { timeStyle: 'short' })}</div>
                </div>
              </div>
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
