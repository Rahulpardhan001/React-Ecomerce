import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, getProductById } from '../redux/slice/productSlice';
import { addToCart } from '../redux/slice/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct: product, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const recommendedProducts =products&&products.filter((p) => p.id !== product?.id).slice(0, 4); // top 4

  if (!product) return <p className="text-center text-lg text-gray-500 mt-10">Loading product...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">₹{product.price}</p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts&&recommendedProducts?.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-200"
            >
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />
              <h3 className="mt-2 text-lg font-medium text-gray-700">{item.name}</h3>
              <p className="text-green-600 font-semibold">₹{item.price}</p>
              <a
                href={`/product/${item.id}`}
                className="text-blue-600 hover:underline mt-2 block text-sm"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
