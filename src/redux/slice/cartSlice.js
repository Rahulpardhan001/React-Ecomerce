// redux/slice/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Helper: Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : null;
  } catch (err) {
    console.error("Error reading from localStorage:", err);
    return null;
  }
};

// Helper: Save cart to localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cartState));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};

// Initial state
const defaultInitialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const initialState = loadCartFromLocalStorage() || defaultInitialState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;

      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(i => i.id === itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter(i => i.id !== itemId);
      }

      saveCartToLocalStorage(state);
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += item.price;
      }

      saveCartToLocalStorage(state);
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }

      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
