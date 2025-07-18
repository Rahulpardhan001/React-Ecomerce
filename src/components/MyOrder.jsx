// pages/MyOrder.jsx
import React, { useEffect, useState } from 'react';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('myOrders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 mb-6 shadow-sm bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Order ID: {order.id}</h3>
            <span className="text-sm text-gray-500">{order.date}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="border p-2 rounded text-sm shadow-sm"
              >
                <p className="font-medium">{item.name}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-blue-600">
              Total: ₹{order.total}
            </p>
            <button
              onClick={() => handleDeleteOrder(order.id)}
              className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
            >
              Delete Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
