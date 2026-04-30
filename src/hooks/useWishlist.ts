"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  toggleWishlistItem,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  setWishlistOpen,
} from "@/redux/wishlistSlice";
import { Product } from "@/types";

export function useWishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isOpen } = useSelector((state: RootState) => state.wishlist);

  const isInWishlist = (productId: string) =>
    items.some((item) => item.id === productId);

  return {
    items,
    isOpen,
    totalItems: items.length,
    isInWishlist,
    toggleWishlistItem: (product: Product) => dispatch(toggleWishlistItem(product)),
    removeFromWishlist: (id: string) => dispatch(removeFromWishlist(id)),
    clearWishlist: () => dispatch(clearWishlist()),
    toggleWishlist: () => dispatch(toggleWishlist()),
    setWishlistOpen: (open: boolean) => dispatch(setWishlistOpen(open)),
  };
}
