import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    setUser(null);
    setShowDropdown(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">UrbanMart</Link>

        <ul className="flex items-center space-x-6 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>

          {/*  Profile Dropdown if Logged In */}
          {user ? (
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                Profile ▾
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-50">
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}

          {/* 🛒 Cart */}
          <li className="relative">
            <Link to="/cart" className="flex items-center gap-1">
              <ShoppingCartIcon className="h-5 w-5" />
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-1.5">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
