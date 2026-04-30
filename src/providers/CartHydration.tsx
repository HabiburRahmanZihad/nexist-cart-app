"use client";

import { hydrate } from "@/redux/cartSlice";
import { AppDispatch } from "@/redux/store";
import { hydrateWishlist } from "@/redux/wishlistSlice";
import { CartItem, Product } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Loads persisted cart + wishlist from localStorage once on client mount.
export function CartHydration() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Cart
    try {
      const savedCart = localStorage.getItem("nexist-cart");
      if (savedCart) {
        const items: CartItem[] = JSON.parse(savedCart);
        if (Array.isArray(items)) dispatch(hydrate(items));
      }
    } catch {
      localStorage.removeItem("nexist-cart");
    }

    // Wishlist
    try {
      const savedWishlist = localStorage.getItem("nexist-wishlist");
      if (savedWishlist) {
        const items: Product[] = JSON.parse(savedWishlist);
        if (Array.isArray(items)) dispatch(hydrateWishlist(items));
      }
    } catch {
      localStorage.removeItem("nexist-wishlist");
    }
  }, [dispatch]);

  return null;
}
