import { configureStore, Middleware } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import { CartItem, Product } from "@/types";

const CART_KEY = "nexist-cart";
const WISHLIST_KEY = "nexist-wishlist";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window === "undefined") return result;

  const type = (action as { type: string }).type;

  // ── Cart persistence ──
  if (type === "cart/clearCart") {
    localStorage.removeItem(CART_KEY);
  } else if (
    type.startsWith("cart/") &&
    type !== "cart/hydrate" &&
    type !== "cart/toggleCart" &&
    type !== "cart/setCartOpen"
  ) {
    try {
      const state = store.getState() as { cart: { items: CartItem[] } };
      localStorage.setItem(CART_KEY, JSON.stringify(state.cart.items));
    } catch {
      // Storage quota — fail silently
    }
  }

  // ── Wishlist persistence ──
  if (type === "wishlist/clearWishlist") {
    localStorage.removeItem(WISHLIST_KEY);
  } else if (
    type.startsWith("wishlist/") &&
    type !== "wishlist/hydrateWishlist" &&
    type !== "wishlist/toggleWishlist" &&
    type !== "wishlist/setWishlistOpen"
  ) {
    try {
      const state = store.getState() as { wishlist: { items: Product[] } };
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist.items));
    } catch {
      // Storage quota — fail silently
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
