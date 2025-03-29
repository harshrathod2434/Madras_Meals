// src/pages/CartPage.js
import React from 'react';

const CartPage = ({ cart, removeFromCart, placeOrder, updateQuantity }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                            </div>


                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.menuItem, item.quantity - 1)}
                                    disabled={item.quantity === 1}
                                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                                >
                                    −
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.menuItem, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.menuItem)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    ❌
                                </button>
                            </div>


                        </div>
                    ))}

                    <div className="text-right mt-4">
                        <p className="font-semibold text-lg">Total: ₹{total}</p>
                        <button
                            onClick={placeOrder}
                            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
                        >
                            ✅ Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
