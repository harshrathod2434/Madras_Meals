import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [tab, setTab] = useState("dishes");
  const [dishes, setDishes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    ingredients: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (tab === "dishes") {
      fetch("http://localhost:5001/api/admin/dishes", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then(setDishes)
        .catch(console.error);
    }
  }, [tab, token]);

  const startEdit = (dish) => {
    setEditId(dish._id);
    setForm({
      name: dish.name,
      price: dish.price,
      image: dish.image || "",
      ingredients: dish.ingredients
        .map((i) => `${i.name}|${i.quantity}`)
        .join(",")
    });
  };

  const saveEdit = async () => {
    // parse ingredients
    const ingredients = form.ingredients.split(",").map((s) => {
      const [name, qty] = s.split("|").map((x) => x.trim());
      return { name, quantity: Number(qty) };
    });

    const res = await fetch(
      `http://localhost:5001/api/admin/dishes/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, ingredients })
      }
    );
    const updated = await res.json();
    setDishes((d) =>
      d.map((dish) => (dish._id === editId ? updated : dish))
    );
    setEditId(null);
  };

  const deleteDish = async (id) => {
    await fetch(`http://localhost:5001/api/admin/dishes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setDishes((d) => d.filter((dish) => dish._id !== id));
  };

  // build image URL
  const imageUrl = (name) =>
    `${process.env.PUBLIC_URL}/images/${name.toLowerCase().replace(/\s+/g, "-")}.jpg`;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        {["dishes", "inventory", "orders"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-blue-500 text-white" : "bg-white border"
            }`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "dishes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes.map((dish) => (
            <div key={dish._id} className="bg-white p-4 shadow rounded">
              {editId === dish._id ? (
                // EDIT FORM
                <>
                  <input
                    className="border p-1 w-full mb-1"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    className="border p-1 w-full mb-1"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="Price"
                  />
                  <input
                    className="border p-1 w-full mb-1"
                    value={form.image}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.value })
                    }
                    placeholder="Image path"
                  />
                  <textarea
                    className="border p-1 w-full mb-1"
                    value={form.ingredients}
                    onChange={(e) =>
                      setForm({ ...form, ingredients: e.target.value })
                    }
                    placeholder="ing1|qty,ing2|qty"
                  />
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                // DISPLAY CARD
                <>
                  <img
                    src={dish.image ? dish.image : imageUrl(dish.name)}
                    alt={dish.name}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <h2 className="text-xl font-semibold">{dish.name}</h2>
                  <p className="text-gray-600">₹{dish.price}</p>
                  <ul className="text-sm text-gray-500 mb-2">
                    {dish.ingredients.map((ing) => (
                      <li key={ing.name}>
                        {ing.name} – {ing.quantity}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => startEdit(dish)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteDish(dish._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "inventory" && <div>Inventory management here</div>}
      {tab === "orders" && <div>Order view here</div>}
    </div>
  );
}
