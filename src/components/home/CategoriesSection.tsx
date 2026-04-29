"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "Electronics",
    count: 4,
    image: "https://picsum.photos/seed/headphones/600/400",
    href: "/products?category=Electronics",
    accent: "from-violet-600/80 to-indigo-700/80",
  },
  {
    name: "Fashion",
    count: 2,
    image: "https://picsum.photos/seed/sunglasses/600/400",
    href: "/products?category=Fashion",
    accent: "from-rose-600/80 to-pink-700/80",
  },
  {
    name: "Home",
    count: 3,
    image: "https://picsum.photos/seed/coffee/600/400",
    href: "/products?category=Home",
    accent: "from-amber-600/80 to-orange-700/80",
  },
  {
    name: "Sports",
    count: 2,
    image: "https://picsum.photos/seed/yogamat/600/400",
    href: "/products?category=Sports",
    accent: "from-emerald-600/80 to-teal-700/80",
  },
  {
    name: "Books",
    count: 1,
    image: "https://picsum.photos/seed/book/600/400",
    href: "/products?category=Books",
    accent: "from-slate-600/80 to-gray-700/80",
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Browse by Category
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find your collection
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Explore our five curated categories, each filled with carefully
            selected premium products.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ name, count, image, href, accent }, i) => (
            <SectionReveal key={name} delay={i * 0.08}>
              <Link href={href} className="group block">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl shadow-md"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${accent} opacity-70 transition-opacity group-hover:opacity-80`}
                  />
                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="font-bold">{name}</p>
                    <p className="text-xs opacity-80">{count} products</p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ArrowRight className="h-3.5 w-3.5 text-white" />
                  </div>
                </motion.div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-8 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View all collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
