"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Verified Buyer",
    avatar: "https://picsum.photos/seed/reviewer-sarah/80/80",
    rating: 5,
    product: "Premium Wireless Headphones",
    review:
      "Absolutely incredible sound quality. The noise cancellation is a game-changer for my daily commute. I've tried a dozen headphones over the years and these are by far the best investment I've made.",
  },
  {
    name: "James Thornton",
    role: "Verified Buyer",
    avatar: "https://picsum.photos/seed/reviewer-james/80/80",
    rating: 5,
    product: "Barista Pro Coffee Maker",
    review:
      "I was skeptical at first, but this coffee maker genuinely produces cafe-quality espresso at home. Fast shipping, beautifully packaged, and the product exceeded every expectation I had.",
  },
  {
    name: "Emily Rodriguez",
    role: "Verified Buyer",
    avatar: "https://picsum.photos/seed/reviewer-emily/80/80",
    rating: 5,
    product: "Insulated Hydro Flask",
    review:
      "My water stays cold for 24 hours — even on hikes in 35-degree heat. The build quality is phenomenal and the lid seals perfectly. Already bought two more as gifts for friends.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Customer Reviews
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            What our customers say
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Real reviews from real people — we never filter or edit customer
            feedback.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(
            ({ name, role, avatar, rating, product, review }, i) => (
              <SectionReveal key={name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* Stars */}
                  <StarRating rating={rating} />

                  {/* Review text */}
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{review}&rdquo;
                  </p>

                  {/* Product tag */}
                  <p className="mt-4 text-xs font-medium text-primary">
                    Purchased: {product}
                  </p>

                  {/* Author */}
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={avatar}
                        alt={name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
