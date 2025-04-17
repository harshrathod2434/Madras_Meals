import { useState } from "react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("dishes");

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
        {tab === "dishes" && <div>Dishes component here</div>}
        {tab === "inventory" && <div>Inventory management here</div>}
        {tab === "orders" && <div>Order view here</div>}
      </div>
    </div>
  );
}
