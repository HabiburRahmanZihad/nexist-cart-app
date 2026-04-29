"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TEAM = [
  {
    name: "Alex Chen",
    role: "CEO & Co-founder",
    bio: "10+ years building consumer products at Amazon and Shopify. Obsessed with finding products people actually love.",
    image: "https://picsum.photos/seed/team-alex/300/300",
  },
  {
    name: "Maya Patel",
    role: "Head of Design",
    bio: "Crafts premium user experiences. Previously design lead at Figma. Believes great design should feel inevitable.",
    image: "https://picsum.photos/seed/team-maya/300/300",
  },
  {
    name: "Jordan Kim",
    role: "Engineering Lead",
    bio: "Full-stack engineer obsessed with performance and clean code. Open-source contributor with 12K+ GitHub stars.",
    image: "https://picsum.photos/seed/team-jordan/300/300",
  },
  {
    name: "Sam Rivera",
    role: "Customer Experience",
    bio: "Ensures every interaction is delightful. Responds to every support ticket personally. Our secret weapon.",
    image: "https://picsum.photos/seed/team-sam/300/300",
  },
];

const STATS = [
  { value: "2021", label: "Founded" },
  { value: "12+", label: "Products" },
  { value: "10K+", label: "Happy Customers" },
  { value: "4.8", label: "Average Rating" },
];

const VALUES = [
  {
    Icon: ShieldCheck,
    title: "Quality Without Compromise",
    description:
      "We hand-test every product before listing it. If it doesn't meet our standards, it doesn't make the cut — simple as that.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    Icon: Heart,
    title: "Customer First, Always",
    description:
      "Our 30-day no-questions-asked return policy exists because we believe in our products and in your satisfaction.",
    color: "bg-rose-100 text-rose-700",
  },
  {
    Icon: Zap,
    title: "Transparent & Honest",
    description:
      "We show real customer reviews — good and bad. We price fairly and never use dark patterns or hidden fees.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    Icon: Users,
    title: "Community Driven",
    description:
      "Our product catalog is shaped by customer feedback. You suggest it, we source it. That's the Nexist promise.",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-br from-primary/8 via-background to-accent/10">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Story
              </span>
              <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight">
                We believe shopping should feel
                <span className="text-primary"> good.</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Nexist was born out of frustration with the overwhelming noise
                of modern e-commerce. Too many choices, too little curation, and
                far too much mediocrity. We set out to change that — one premium
                product at a time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/collections" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  View Collections
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="relative hidden overflow-hidden rounded-3xl lg:block"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="https://picsum.photos/seed/about-hero/800/600"
                alt="Nexist team"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent" />
              {/* Floating review card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-border/40 bg-card/90 px-4 py-3 backdrop-blur-sm shadow-lg"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold">10,000+ customers</p>
                  <p className="text-xs text-muted-foreground">
                    trust us every month
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {STATS.map(({ value, label }, i) => (
            <SectionReveal key={label} delay={i * 0.08}>
              <div className="py-8 text-center">
                <p className="text-3xl font-extrabold text-primary">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <SectionReveal>
              <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="https://picsum.photos/seed/about-mission/800/600"
                  alt="Our mission"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Less noise. More signal.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The internet has made it possible to buy almost anything, but
                that abundance comes with a cost: decision paralysis. We spend
                hours researching, reading reviews, and second-guessing ourselves.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                At Nexist, we do that work so you don&apos;t have to. Every
                product in our catalog has been sourced, tested, and approved by
                real people who care about quality. We&apos;d rather have 12
                exceptional products than 12,000 mediocre ones.
              </p>
              <Separator className="my-6" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Products Tested", value: "200+" },
                  { label: "Products Listed", value: "12" },
                  { label: "Rejection Rate", value: "94%" },
                  { label: "Customer Satisfaction", value: "98%" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-2xl font-extrabold text-primary">{value}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              What We Stand For
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Our core values
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, description, color }, i) => (
              <SectionReveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-lg"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              The People
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Meet the team
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              A small team with a big obsession — building the best-curated
              shopping experience on the internet.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map(({ name, role, bio, image }, i) => (
              <SectionReveal key={name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col items-center rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm hover:shadow-lg"
                >
                  <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-2xl bg-muted shadow-sm">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-bold">{name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-primary">
                    {role}
                  </p>
                  <Separator className="my-3" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {bio}
                  </p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-border bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to find your next favourite thing?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
              Join thousands of customers who&apos;ve discovered products they
              genuinely love through Nexist.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className={cn(buttonVariants({ size: "lg" }), "bg-white text-primary hover:bg-white/90")}
              >
                Browse Products
              </Link>
              <Link
                href="/collections"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/30 text-white hover:bg-white/10")}
              >
                View Collections
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
