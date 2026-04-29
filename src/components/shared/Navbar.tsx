"use client";

import { ShoppingCart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexist</span>
        </div>

        {/* Nav Links (decorative) */}
        <nav className="hidden items-center gap-6 md:flex">
          {["Products", "Collections", "About"].map((link) => (
            <span
              key={link}
              className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </span>
          ))}
        </nav>

        {/* Cart button */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleCart}
          className="relative gap-2"
          aria-label={`Open cart, ${totalItems} items`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>

          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </header>
  );
}
