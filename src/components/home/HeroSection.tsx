"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGES = [
  { src: "https://picsum.photos/seed/headphones/400/400", alt: "Headphones" },
  { src: "https://picsum.photos/seed/smartwatch/400/400", alt: "Smart Watch" },
  { src: "https://picsum.photos/seed/coffee/400/400", alt: "Coffee Maker" },
  { src: "https://picsum.photos/seed/yogamat/400/400", alt: "Yoga Mat" },
];

const TRUST_BADGES = [
  { Icon: Truck, label: "Free Shipping over $100" },
  { Icon: ShieldCheck, label: "Quality Guaranteed" },
  { Icon: RotateCcw, label: "30-Day Returns" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-br from-primary/5 via-background to-accent/10">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Left — copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <motion.span
            variants={itemVariants}
            className="w-fit rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            New arrivals every week
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-5 text-5xl font-extrabold leading-tight tracking-tight text-foreground sm:text-6xl"
          >
            Shop what you
            <span className="block text-primary">truly love.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Discover a curated collection of premium products — from
            cutting-edge electronics to timeless lifestyle essentials. Every
            item is handpicked for quality and value.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/products"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 px-6")}
            >
              Shop All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/collections"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "px-6")}
            >
              Browse Collections
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — image mosaic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="hidden grid-cols-2 gap-4 lg:grid"
        >
          {HERO_IMAGES.map(({ src, alt }, i) => (
            <motion.div
              key={alt}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.25 }}
              className={`relative overflow-hidden rounded-2xl bg-muted shadow-lg ${i === 1 ? "mt-6" : ""} ${i === 3 ? "-mt-6" : ""}`}
              style={{ aspectRatio: "1/1" }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-border/40 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "12+", label: "Premium Products" },
            { value: "5", label: "Categories" },
            { value: "10K+", label: "Happy Customers" },
            { value: "4.8", label: "Average Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="py-6 text-center">
              <p className="text-2xl font-extrabold text-primary">{value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
