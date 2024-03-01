import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../axios_instance";

const initialState = {};

export const create_product = createAsyncThunk(
  "/create_product",
  async (inputs) => {
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
      }
      await AxiosInstance.post("/product/create_product", data);
      return;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetch_products = createAsyncThunk(
  "/fetch_products/:id",
  async (id) => {
    try {
      const res = await AxiosInstance.get(`/product/fetch_products/${id}`);
      return res.data.products;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {},
});

export default productSlice.reducer;
