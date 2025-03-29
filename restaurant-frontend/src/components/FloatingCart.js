import { Link } from 'react-router-dom';

const FloatingCart = ({ cart }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Link to="/cart" className="fixed bottom-6 right-6 bg-white border border-gray-300 shadow-lg px-5 py-3 rounded-xl z-50 hover:shadow-xl transition">
      <div className="text-sm text-gray-800 font-medium">
        🛒 {totalItems} items <br />
        ₹{totalAmount} → View Cart
      </div>
    </Link>
  );
};

export default FloatingCart;
