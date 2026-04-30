"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
    toast.error(`${item.name} removed from cart`, { duration: 2000 });
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      handleRemove();
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex gap-3 py-4">
        {/* Thumbnail */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="line-clamp-2 text-sm font-semibold leading-tight">
                {item.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.category}
              </p>
            </div>
            <button
              onClick={handleRemove}
              aria-label={`Remove ${item.name}`}
              className="text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Quantity + Price */}
          <div className="flex items-center justify-between">
            {/* Quantity controls */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleIncrease}
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Line total */}
            <p className="text-sm font-bold text-primary">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <Separator />
    </motion.div>
  );
}
