"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export function EmptyCart() {
  const { setCartOpen } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      {/* Animated icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
      >
        <ShoppingCart className="h-9 w-9 text-muted-foreground" />
      </motion.div>

      <h3 className="text-xl font-semibold">Your cart is empty</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Looks like you haven't added anything yet. Browse our collection and
        find something you love.
      </p>

      <Button
        className="mt-6"
        onClick={() => setCartOpen(false)}
      >
        Start Shopping
      </Button>
    </motion.div>
  );
}
