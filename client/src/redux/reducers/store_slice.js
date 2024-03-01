import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../axios_instance";

const initialState = {
  stores: [],
  loading_stores: false,
};

export const create_store = createAsyncThunk(
  "/create_store",
  async (inputs) => {
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(inputs)) {
        data.append(key, value);
      }
      const res = await AxiosInstance.post("/store/create_store", data);
      return res.data.store;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetch_stores = createAsyncThunk("/fetch_stores", async () => {
  try {
    const res = await AxiosInstance.get("/store/fetch_stores");
    return res.data.stores;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetch_store = createAsyncThunk("/fetch_store", async (id) => {
  try {
    const res = await AxiosInstance.get(`/store/fetch_store/${id}`);
    return res.data.store;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const storeSlice = createSlice({
  name: "store",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetch_stores.pending, (state) => {
      state.loading_stores = true;
    });
    builder.addCase(fetch_stores.rejected, (state) => {
      state.loading_stores = false;
    });
    builder.addCase(fetch_stores.fulfilled, (state, action) => {
      state.loading_stores = false;
      state.stores = action.payload;
    });
  },
});

export default storeSlice.reducer;
