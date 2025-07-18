import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slice/cartSlice';
import { toast } from 'react-toastify';

const Order = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // modal visibility
  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (
      !form.fullName ||
      !form.address ||
      !form.city ||
      !form.postalCode ||
      !form.phone
    ) {
      toast.error('Please fill in all fields');
      return;
    }
  
    const order = {
      id: Date.now(), // unique id
      user: user?.email,
      items: cartItems,
      shipping: form,
      total: totalPrice.toFixed(2),
      date: new Date().toLocaleString(),
    };
  
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
  
    dispatch(clearCart());
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <form className="space-y-4">
            {['fullName', 'address', 'city', 'postalCode', 'phone'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">₹ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <h4 className="text-lg font-semibold">
              Total: ₹ {totalPrice.toFixed(2)}
            </h4>
          </div>
          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white mt-6 py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* ✅ Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Order Placed!</h2>
            <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
            <button
              onClick={handleCloseModal}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
