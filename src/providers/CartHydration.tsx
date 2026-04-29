"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrate } from "@/redux/cartSlice";
import { CartItem } from "@/types";
import { AppDispatch } from "@/redux/store";

// Loads persisted cart from localStorage once on client mount.
// Runs inside ReduxProvider so dispatch is available.
export function CartHydration() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexist-cart");
      if (saved) {
        const items: CartItem[] = JSON.parse(saved);
        if (Array.isArray(items)) {
          dispatch(hydrate(items));
        }
      }
    } catch {
      // Corrupt localStorage data — start fresh
      localStorage.removeItem("nexist-cart");
    }
  }, [dispatch]);

  return null;
}
