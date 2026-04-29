"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { motion } from "framer-motion";
import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const FEATURES = [
  {
    Icon: Truck,
    title: "Free Shipping",
    description:
      "Free delivery on all orders over $100. Express shipping available at checkout.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    Icon: ShieldCheck,
    title: "Quality Guarantee",
    description:
      "Every product is hand-vetted. We only stock items we would use ourselves.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    Icon: RotateCcw,
    title: "30-Day Returns",
    description:
      "Not happy? Return anything within 30 days, no questions asked, full refund.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    Icon: Headphones,
    title: "24/7 Support",
    description:
      "Our expert team is always available to help you find the perfect product.",
    color: "bg-rose-100 text-rose-700",
  },
];

export function WhyNexist() {
  return (
    <section className="bg-muted/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Shopping made simple
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We take care of everything so you can focus on what matters —
            finding products you love.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ Icon, title, description, color }, i) => (
            <SectionReveal key={title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
