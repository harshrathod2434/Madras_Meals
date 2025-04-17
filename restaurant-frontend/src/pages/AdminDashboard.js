import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("dishes");
  const [dishes, setDishes] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch dishes when tab changes
  useEffect(() => {
    if (tab === "dishes") {
      fetch("http://localhost:5001/api/menu")
        .then((res) => res.json())
        .then((data) => setDishes(data))
        .catch((err) => console.error("Failed to fetch dishes", err));
    }
  }, [tab]);

  // Fetch inventory when tab changes
  useEffect(() => {
    if (tab === "inventory") {
      fetch("http://localhost:5001/api/inventory")
        .then((res) => res.json())
        .then((data) => setInventory(data))
        .catch((err) => console.error("Failed to fetch inventory", err));
    }
  }, [tab]);

  // Fetch orders when tab changes
  useEffect(() => {
    if (tab === "orders") {
      fetch("http://localhost:5001/api/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Failed to fetch orders", err));
    }
  }, [tab]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        {["dishes", "inventory", "orders"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${tab === t ? "bg-blue-500 text-white" : "bg-white border"}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div>
        {tab === "dishes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dishes.map((dish) => (
              <div key={dish._id} className="bg-white p-4 shadow rounded">
                <img
                  src={dish.image || "/images/banner.jpg"}
                  alt={dish.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h2 className="text-xl font-semibold">{dish.name}</h2>
                <p className="text-gray-600">₹{dish.price}</p>
                <ul className="text-sm text-gray-500 mb-2">
                  {dish.ingredients.map((ing) => (
                    <li key={ing.name}>
                      {ing.name} - {ing.quantity}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "inventory" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map((item) => (
              <div key={item._id} className="bg-white p-4 shadow rounded">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  Quantity: {item.quantity} {item.unit}
                </p>
                <p className="text-sm text-gray-500">Threshold: {item.threshold}</p>
                <div className="flex justify-between">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order._id} className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                    <p className="text-gray-600">Total: ₹{order.totalPrice}</p>
                    <ul className="text-sm text-gray-500 mb-2">
                      {order.items.map((item) => (
                        <li key={item.dishName}>
                          {item.dishName} - {item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-500">Status: {order.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
