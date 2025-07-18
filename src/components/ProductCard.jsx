import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../redux/slice/cartSlice';
import React from 'react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col group">
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
          />
        </div>
        <h3 className="text-lg font-bold mt-3 group-hover:text-blue-600 transition">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm capitalize">{product.category}</p>
        <p className="text-blue-600 font-semibold text-md mt-1">${product.price}</p>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg mt-4 hover:from-blue-700 hover:to-indigo-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
