"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, HeartOff, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export function WishlistSidebar() {
  const { items, isOpen, setWishlistOpen, removeFromWishlist, clearWishlist, totalItems } =
    useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleMoveToCart = (product: Product) => {
    if (!isInCart(product.id)) {
      addToCart(product);
      toast.success("Moved to cart!", { description: product.name, duration: 2000 });
    }
    removeFromWishlist(product.id);
  };

  const handleRemove = (product: Product) => {
    removeFromWishlist(product.id);
    toast.info("Removed from wishlist", { description: product.name, duration: 1800 });
  };

  const handleClear = () => {
    clearWishlist();
    toast.info("Wishlist cleared", { duration: 2000 });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setWishlistOpen}>
      <SheetContent side="left" className="flex w-full flex-col p-0 sm:max-w-md">
        {/* Header */}
        <SheetHeader className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-rose-500" />
              Wishlist
              {totalItems > 0 && (
                <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-bold text-rose-400">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
            {items.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>
          {totalItems > 0 && (
            <p className="text-xs text-muted-foreground">
              {totalItems} saved item{totalItems !== 1 ? "s" : ""} — add them to your cart to checkout
            </p>
          )}
        </SheetHeader>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <HeartOff className="h-9 w-9 text-muted-foreground/40" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Your wishlist is empty</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Click the heart on any product to save it here.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setWishlistOpen(false)}
              className="mt-2"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              <AnimatePresence initial={false}>
                {items.map((product) => {
                  const inCart = isInCart(product.id);
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : null;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mb-3 overflow-hidden rounded-xl border border-border/60 bg-card"
                    >
                      <div className="flex gap-3 p-3">
                        {/* Image */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-xs text-muted-foreground">{product.category}</span>
                              <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                                {product.name}
                              </h4>
                            </div>
                            <button
                              type="button"
                              aria-label="Remove from wishlist"
                              onClick={() => handleRemove(product)}
                              className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-foreground">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                              {discount && (
                                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                  -{discount}%
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleMoveToCart(product)}
                              className={cn(
                                "flex h-7 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold transition-all",
                                inCart
                                  ? "bg-emerald-500/15 text-emerald-400 cursor-default"
                                  : "bg-primary text-primary-foreground hover:bg-primary/90"
                              )}
                            >
                              <ShoppingCart className="h-3 w-3" />
                              {inCart ? "In Cart" : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-card px-6 pb-6 pt-4">
              <Separator className="mb-4" />
              <Button
                type="button"
                className="w-full gap-2"
                onClick={() => {
                  items.forEach((product) => {
                    if (!isInCart(product.id)) addToCart(product);
                  });
                  clearWishlist();
                  toast.success("All items moved to cart!", { duration: 2500 });
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                Move All to Cart
              </Button>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="mt-2 w-full text-center text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
