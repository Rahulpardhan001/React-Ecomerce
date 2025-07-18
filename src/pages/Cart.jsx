import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../redux/slice/cartSlice';
import React from 'react';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("user"); // Check if user is logged in

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToOrder = () => {
    if (isLoggedIn) {
      // You can add order logic here or navigate to a checkout page
      navigate("/order")
    } else {
      navigate("/login");
      toast.error("Please login to proceed with your order.")
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right space-y-4">
        <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
        <button
          onClick={handleProceedToOrder}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
