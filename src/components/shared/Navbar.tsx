"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LOGO = "https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_vnhpx6.jpg";


const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistCount, toggleWishlist } = useWishlist();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {/* Icon logo — always visible */}
          <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-md ring-1 ring-border/40">
            <Image
              src={LOGO}
              alt="Nexist logo"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          {/* Wide logo with banner — visible on sm+ */}
          <div className="relative hidden h-8 w-28 sm:block">
            <p className="text-2xl">Nexist</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive(href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {label}
              {isActive(href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-primary/8"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleWishlist}
            className="relative gap-2"
            aria-label={`Open wishlist, ${wishlistCount} items`}
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Wishlist</span>
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key="wbadge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow"
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Cart */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleCart}
            className="relative gap-2 border-border/60 hover:border-primary/40"
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
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${isActive(href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
