"use client";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index: number;
  layout?: "grid" | "list";
}

const BADGE_CONFIG: Record<string, { pill: string; dot: string }> = {
  "Best Seller": {
    pill: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    dot: "bg-amber-400",
  },
  Hot: {
    pill: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    dot: "bg-rose-400",
  },
  New: {
    pill: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  Sale: {
    pill: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
    dot: "bg-violet-400",
  },
};

export function ProductCard({ product, index, layout = "grid" }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (inCart) return;
    addToCart(product);
    toast.success("Added to cart!", { description: product.name, duration: 2000 });
  };

  const handleToggleWishlist = () => {
    toggleWishlistItem(product);
    if (!wishlisted) {
      toast.success("Saved to wishlist!", { description: product.name, duration: 1800 });
    } else {
      toast.info("Removed from wishlist", { description: product.name, duration: 1800 });
    }
  };

  const badgeConf = product.badge ? BADGE_CONFIG[product.badge] : null;

  /* ── LIST LAYOUT ── */
  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
        className="group"
      >
        <div
          className={cn(
            "flex overflow-hidden rounded-2xl border bg-card transition-all duration-300",
            "border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
            inCart && "border-emerald-500/30 shadow-lg shadow-emerald-500/5"
          )}
        >
          {/* Image — compact on mobile, wider on sm+ */}
          <div className="relative w-24 shrink-0 overflow-hidden bg-muted sm:w-44 md:w-52">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 96px, (max-width: 768px) 176px, 208px"
              priority={index === 0}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Badge — only on sm+ where there's room */}
            {badgeConf && product.badge && (
              <div className="absolute left-2 top-2 hidden sm:block">
                <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm", badgeConf.pill)}>
                  <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", badgeConf.dot)} />
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 sm:gap-3 sm:p-5">
            {/* Top: info + wishlist */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1 space-y-1 sm:space-y-2">
                {/* Pills row */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground sm:text-xs">
                    {product.category}
                  </span>
                  {discount && (
                    <span className="rounded-full bg-primary/90 px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground sm:text-xs">
                      -{discount}%
                    </span>
                  )}
                  {/* Show badge inline on mobile since image overlay is hidden */}
                  {badgeConf && product.badge && (
                    <span className={cn("flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold sm:hidden", badgeConf.pill)}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary sm:text-sm">
                  {product.name}
                </h3>

                {/* Description — hidden on mobile, shown on sm+ */}
                <p className="hidden line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:block">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>
              </div>

              {/* Wishlist */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.82 }}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleToggleWishlist}
                className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-muted"
              >
                <Heart className={cn("h-4 w-4 transition-colors duration-200", wishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
              </motion.button>
            </div>

            {/* Bottom: price + CTA */}
            <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-2 sm:pt-3">
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-foreground sm:text-lg">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] text-muted-foreground line-through sm:text-xs">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.93 }}
                onClick={handleAddToCart}
                disabled={inCart}
                className={cn(
                  "flex h-8 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-all duration-200 sm:h-9 sm:px-4 sm:text-sm",
                  inCart
                    ? "bg-emerald-500/15 text-emerald-400 cursor-default"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
                )}
              >
                {inCart ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">In Cart</span>
                    <span className="sm:hidden">Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── GRID LAYOUT ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: [0.23, 1, 0.32, 1] }}
      className="group relative h-full"
    >
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
          "border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/8",
          inCart && "border-emerald-500/30 shadow-lg shadow-emerald-500/5",
          wishlisted && !inCart && "border-rose-500/20"
        )}
      >
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={index === 0}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {badgeConf && product.badge && (
              <span className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm", badgeConf.pill)}>
                <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", badgeConf.dot)} />
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="rounded-full bg-primary/90 px-2.5 py-1 text-xs font-bold text-primary-foreground backdrop-blur-sm shadow">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist button — always visible when wishlisted, fades in on hover otherwise */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.82 }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleToggleWishlist}
            className={cn(
              "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-all duration-200",
              wishlisted
                ? "bg-rose-500 opacity-100"
                : "bg-background/80 opacity-0 group-hover:opacity-100"
            )}
          >
            <Heart className={cn("h-4 w-4 transition-colors duration-200", wishlisted ? "fill-white text-white" : "text-muted-foreground")} />
          </motion.button>

          {/* In-cart indicator */}
          <AnimatePresence>
            {inCart && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl bg-emerald-500/90 px-3 py-2 backdrop-blur-sm"
              >
                <Check className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">In your cart</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2.5 p-4">
          {/* Category + Rating */}
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {product.category}
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
            {product.name}
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Price + CTA */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 pt-3">
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={inCart}
              className={cn(
                "flex h-9 shrink-0 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-all duration-200",
                inCart
                  ? "bg-emerald-500/15 text-emerald-400 cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25"
              )}
            >
              {inCart
                ? <><Check className="h-4 w-4" /> Added</>
                : <><Zap className="h-4 w-4" /> Add</>}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
