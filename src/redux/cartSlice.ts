import { CartItem, CartState, Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Hydrate cart from localStorage on client mount
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    addToCart(state, action: PayloadAction<Product>) {
      const alreadyInCart = state.items.some(
        (item) => item.id === action.payload.id
      );
      // Silently ignore if duplicate — UI should disable the button
      if (!alreadyInCart) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },

    clearCart(state) {
      state.items = [];
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  hydrate,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
