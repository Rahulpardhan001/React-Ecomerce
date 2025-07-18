import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../data/product.json';

const initialState = {
  allProducts: productsData,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductById: (state, action) => {
      const id = action.payload;
      state.selectedProduct = state.allProducts.find((product) => product.id === Number(id));
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { getProductById, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
