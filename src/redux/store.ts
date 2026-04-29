import { configureStore, Middleware } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { CartItem } from "@/types";

const STORAGE_KEY = "nexist-cart";

// Persist cart items to localStorage on every cart action
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof window === "undefined") return result;

  const actionType = (action as { type: string }).type;

  if (actionType === "cart/clearCart") {
    localStorage.removeItem(STORAGE_KEY);
  } else if (actionType.startsWith("cart/") && actionType !== "cart/hydrate" && actionType !== "cart/toggleCart" && actionType !== "cart/setCartOpen") {
    try {
      const state = store.getState() as { cart: { items: CartItem[] } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart.items));
    } catch {
      // Storage quota exceeded — fail silently
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
