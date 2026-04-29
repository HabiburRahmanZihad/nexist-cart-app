"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { Badge } from "@/components/ui/badge";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = productsData as Product[];

const COLLECTION_META: Record<
  string,
  {
    description: string;
    image: string;
    accent: string;
    tagline: string;
  }
> = {
  Electronics: {
    description:
      "Cutting-edge gadgets, audio gear, and smart devices for the modern tech enthusiast.",
    image: "https://picsum.photos/seed/headphones/800/500",
    accent: "from-violet-500 to-indigo-600",
    tagline: "Future-proof your lifestyle",
  },
  Fashion: {
    description:
      "Timeless accessories and premium materials for a style that lasts beyond trends.",
    image: "https://picsum.photos/seed/sunglasses/800/500",
    accent: "from-rose-500 to-pink-600",
    tagline: "Define your signature look",
  },
  Home: {
    description:
      "Thoughtfully designed home essentials that elevate your everyday living experience.",
    image: "https://picsum.photos/seed/coffee/800/500",
    accent: "from-amber-500 to-orange-600",
    tagline: "Transform your space",
  },
  Sports: {
    description:
      "Performance gear and wellness tools engineered for athletes and active lifestyles.",
    image: "https://picsum.photos/seed/yogamat/800/500",
    accent: "from-emerald-500 to-teal-600",
    tagline: "Reach your peak performance",
  },
  Books: {
    description:
      "Curated titles that educate, inspire, and challenge you to grow every single day.",
    image: "https://picsum.photos/seed/book/800/500",
    accent: "from-slate-500 to-gray-700",
    tagline: "Invest in your mind",
  },
};

// Build collections from products data
const collections = Object.entries(COLLECTION_META).map(([name, meta]) => {
  const items = products.filter((p) => p.category === name);
  return {
    name,
    count: items.length,
    previews: items.slice(0, 3).map((p) => p.image),
    ...meta,
  };
});

export default function CollectionsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border/40 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Collections
          </span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            Browse by Category
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Five carefully curated collections. Each one tells a story — find
            yours.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {collections.map(
            ({ name, count, previews, description, image, accent, tagline }, i) => (
              <SectionReveal key={name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Image panel */}
                    <div className="relative lg:col-span-2">
                      <div className="relative h-56 lg:h-full" style={{ minHeight: "220px" }}>
                        <Image
                          src={image}
                          alt={name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${accent} opacity-60`}
                        />
                        {/* Category label on image */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                          <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                            Collection
                          </p>
                          <h2 className="mt-1 text-3xl font-extrabold drop-shadow-md">
                            {name}
                          </h2>
                          <p className="mt-1 text-sm opacity-80">{tagline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Info panel */}
                    <div className="flex flex-col justify-between p-8 lg:col-span-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="gap-1.5">
                            <Package className="h-3 w-3" />
                            {count} product{count !== 1 ? "s" : ""}
                          </Badge>
                        </div>

                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                          {description}
                        </p>

                        {/* Preview thumbnails */}
                        <div className="mt-6 flex items-center gap-3">
                          {previews.map((src, idx) => (
                            <div
                              key={idx}
                              className="relative h-16 w-16 overflow-hidden rounded-xl bg-muted shadow-sm"
                            >
                              <Image
                                src={src}
                                alt={`${name} preview ${idx + 1}`}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {count > 3 && (
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-sm font-semibold text-muted-foreground">
                              +{count - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link
                          href={`/products?category=${name}`}
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:gap-3"
                        >
                          Shop {name}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            )
          )}
        </div>
      </section>
    </>
  );
}
