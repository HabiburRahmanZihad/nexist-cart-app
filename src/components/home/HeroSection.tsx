"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Package, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGES = [
  { src: "https://picsum.photos/seed/headphones/400/400", alt: "Headphones" },
  { src: "https://picsum.photos/seed/smartwatch/400/400", alt: "Smart Watch" },
  { src: "https://picsum.photos/seed/coffee/400/400", alt: "Coffee Maker" },
  { src: "https://picsum.photos/seed/backpack/400/400", alt: "Backpack" },
];

const TRUST_BADGES = [
  { Icon: Truck, label: "Free Shipping over $100" },
  { Icon: ShieldCheck, label: "Quality Guaranteed" },
  { Icon: RotateCcw, label: "30-Day Returns" },
];

const STATS = [
  { Icon: Package, value: "48+", label: "Premium Products" },
  { Icon: ShoppingBag, value: "5", label: "Categories" },
  { Icon: Users, value: "10K+", label: "Happy Customers" },
  { Icon: Star, value: "4.8", label: "Average Rating" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-background to-accent/10" />
      <div className="pointer-events-none absolute -left-48 -top-48 h-150 w-150 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-accent/12 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* ── Left: Copy ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.span
            variants={item}
            className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            ✦ New arrivals every week
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
          >
            Shop what you
            <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              truly love.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Discover a curated collection of premium products — from
            cutting-edge electronics to timeless lifestyle essentials. Every
            item is handpicked for quality and value.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/products"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 px-7 shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-shadow"
              )}
            >
              Shop All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collections"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-7 hover:border-primary/50"
              )}
            >
              Browse Collections
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-5 border-t border-border/40 pt-8"
          >
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Image mosaic ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="hidden grid-cols-2 gap-4 lg:grid"
        >
          {HERO_IMAGES.map(({ src, alt }, i) => (
            <motion.div
              key={alt}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-xl ring-1 ring-border/30",
                i === 1 && "mt-8",
                i === 3 && "-mt-8"
              )}
            >
              <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative border-t border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border/50 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map(({ Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 py-6">
              <div className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary" />
                <p className="text-2xl font-extrabold text-primary">{value}</p>
              </div>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
