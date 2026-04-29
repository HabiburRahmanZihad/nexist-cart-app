"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { SectionReveal } from "@/components/shared/SectionReveal";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featured = (productsData as Product[]).filter(
  (p) => p.badge === "Best Seller"
);

export function FeaturedProducts() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Top Picks
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Best Sellers
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Our most-loved products — chosen by thousands of happy customers.
            </p>
          </div>
          <Link
            href="/products"
            className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
