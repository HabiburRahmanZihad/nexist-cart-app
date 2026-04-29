"use client";

import { AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./CartItem";
import { EmptyCart } from "./EmptyCart";
import { useCart } from "@/hooks/useCart";

const SHIPPING_THRESHOLD = 100;

export function CartSidebar() {
  const { items, isOpen, setCartOpen, totalItems, totalPrice, clearCart } =
    useCart();

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared", { duration: 2000 });
  };

  const handleCheckout = () => {
    toast.success("Order placed! 🎉", {
      description: `Total: $${totalPrice.toFixed(2)}`,
      duration: 3500,
    });
    clearCart();
    setCartOpen(false);
  };

  // Clamp progress to 0-100 for the CSS custom property
  const shippingProgress = Math.min(
    Math.round((totalPrice / SHIPPING_THRESHOLD) * 100),
    100
  );
  const remaining = Math.max(0, SHIPPING_THRESHOLD - totalPrice);
  const orderTotal = totalPrice >= SHIPPING_THRESHOLD ? totalPrice : totalPrice + 9.99;

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
        {/* Header */}
        <SheetHeader className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5" />
              Cart
              {totalItems > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
            {items.length > 0 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>

          {/* Free shipping progress — dynamic width requires a CSS custom property */}
          {items.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {remaining > 0 ? (
                <p className="text-xs text-muted-foreground">
                  Add{" "}
                  <span className="font-semibold text-foreground">
                    ${remaining.toFixed(2)}
                  </span>{" "}
                  more for free shipping
                </p>
              ) : (
                <p className="text-xs font-medium text-emerald-600">
                  🎉 You qualify for free shipping!
                </p>
              )}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full bg-primary transition-all duration-500 w-[${shippingProgress}%]`}
                />
              </div>
            </div>
          )}
        </SheetHeader>

        {/* Cart items */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="border-t border-border bg-card px-6 pb-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                  </span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span
                    className={
                      totalPrice >= SHIPPING_THRESHOLD
                        ? "font-medium text-emerald-600"
                        : "font-medium"
                    }
                  >
                    {totalPrice >= SHIPPING_THRESHOLD ? "Free" : "$9.99"}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span className="text-lg text-primary">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                className="mt-4 w-full gap-2"
                size="lg"
                onClick={handleCheckout}
              >
                <CreditCard className="h-4 w-4" />
                Checkout
              </Button>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
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
