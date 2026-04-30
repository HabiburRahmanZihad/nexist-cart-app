"use client";

import {
  addToCart,
  clearCart,
  removeFromCart,
  setCartOpen,
  toggleCart,
  updateQuantity,
} from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Product } from "@/types";
import { useDispatch, useSelector } from "react-redux";

export function useCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isInCart = (productId: string) =>
    items.some((item) => item.id === productId);

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    isInCart,
    addToCart: (product: Product) => dispatch(addToCart(product)),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    updateQuantity: (id: string, quantity: number) =>
      dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    toggleCart: () => dispatch(toggleCart()),
    setCartOpen: (open: boolean) => dispatch(setCartOpen(open)),
  };
}
