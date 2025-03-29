import { Link, useNavigate } from 'react-router-dom';

function Navbar({ cartCount, user, handleLogout }) {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-gray-800">🍴 Madras Meals</Link>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <button onClick={() => scrollToSection('menu')} className="text-gray-700 hover:text-blue-600">Menu</button>
        <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600">About</button>
        <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600">Contact</button>
        <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart ({cartCount})</Link>
        <Link to="/orders" className="text-gray-700 hover:text-blue-600">My Orders</Link>

        {user ? (
          <>
            <span className="text-gray-600 text-sm">Hi, {user.name?.split(' ')[0]}</span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
