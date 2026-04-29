"use client";

import Image from "next/image";
import { ShoppingCart, Check, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-800 border-amber-200",
  Hot: "bg-rose-100 text-rose-800 border-rose-200",
  New: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Sale: "bg-violet-100 text-violet-800 border-violet-200",
};

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (inCart) return;
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)}`,
      duration: 2500,
    });
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden border border-border/60 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl">
        {/* Image */}
        <CardHeader className="relative p-0">
          <div className="relative h-52 overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badges overlay */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badge && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLES[product.badge]}`}
                >
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                  -{discount}%
                </span>
              )}
            </div>

            {/* In-cart overlay indicator */}
            {inCart && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-[1px]"
              >
                <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg">
                  In Cart
                </span>
              </motion.div>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-2 p-4">
          {/* Category */}
          <Badge variant="secondary" className="w-fit text-xs">
            {product.category}
          </Badge>

          {/* Name */}
          <h3 className="line-clamp-2 font-semibold leading-snug text-foreground">
            {product.name}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-baseline gap-2 pt-2">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0">
          <motion.div className="w-full" whileTap={{ scale: 0.97 }}>
            <Button
              onClick={handleAddToCart}
              disabled={inCart}
              className="w-full gap-2 transition-all"
              variant={inCart ? "secondary" : "default"}
            >
              {inCart ? (
                <>
                  <Check className="h-4 w-4" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
