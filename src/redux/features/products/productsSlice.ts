import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../api/interfaces";
import { axiosApiAdapter } from "../../../api/httpAdapter";
import { store } from "../../store";

const url = "https://fakestoreapi.com/products";

// Agregar un producto al carrito
export const addProductApi = createAsyncThunk(
  "cart/addProduct",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const response = await axiosApiAdapter.get<Product>(`${url}/${productId}`);
    return { ...response, quantity };
  }
);

const initialState = {
  items: [] as Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>, // Tipo para los productos
  error: null as string | null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer para agregar productos directamente
    addProduct: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    // Reducer para eliminar productos
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    // Reducer para limpiar el carrito
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductApi.fulfilled, (state, action) => {
        // Validar que el payload sea válido antes de modificar el estado
        if (action.payload && action.payload.id) {
          const existingProduct = state.items.find(
            (item) => item.id === action.payload.id
          );
          if (existingProduct) {
            existingProduct.quantity += action.payload.quantity;
          } else {
            state.items.push(action.payload);
          }
        }
      })
      .addCase(addProductApi.rejected, (state, action) => {
        // Registrar el error en el estado
        state.error = action.error.message || "Error al agregar el producto";
      });
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

// Tipo del estado de la tienda
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Exportar el reducer
export default cartSlice.reducer;
