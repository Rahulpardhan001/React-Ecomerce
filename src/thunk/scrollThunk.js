// features/userSlice.js
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (page, thunkAPI) => {
    const response = await fetch(`https://dummyjson.com/products?limit=${page}`);
    let res = await response.json();
    console.log(res,"resp.data")
    return res;
  }
);
