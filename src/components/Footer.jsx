import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo and About */}
        <div>
          <h2 className="text-xl font-semibold mb-2">MyShop</h2>
          <p className="text-sm text-gray-300">
            Discover the best deals on top products. Fast delivery, easy returns.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/myorders" className="hover:text-white">My Orders</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Contact Us</h3>
          <p className="text-gray-300 text-sm">
            Email: support@myshop.com<br />
            Phone: +91 98765 43210<br />
            Address: Kurukshetra, Haryana
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-500">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
