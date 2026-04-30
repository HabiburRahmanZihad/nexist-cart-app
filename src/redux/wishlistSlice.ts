import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, WishlistState } from "@/types";

const initialState: WishlistState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },

    toggleWishlistItem(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex((item) => item.id === action.payload.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },

    toggleWishlist(state) {
      state.isOpen = !state.isOpen;
    },

    setWishlistOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  hydrateWishlist,
  toggleWishlistItem,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  setWishlistOpen,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
