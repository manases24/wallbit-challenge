import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../../api/interfaces";
import { axiosApiAdapter } from "../../../api/httpAdapter";
import { store } from "../../store";

const url = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosApiAdapter.get<Product[]>(url);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default productsSlice.reducer;
