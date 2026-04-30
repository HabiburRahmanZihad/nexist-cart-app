"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Code2,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TEAM = [
  {
    name: "Alex Nguyen",
    role: "CEO & Co-founder",
    bio: "Visionary technologist with 12+ years building scalable EdTech and enterprise software. Previously at Coursera and Salesforce.",
    image: "https://picsum.photos/seed/team-alex/300/300",
  },
  {
    name: "Priya Sharma",
    role: "Head of LMS Engineering",
    bio: "LMS architecture specialist. Led development of learning platforms used by 500K+ learners globally. React & Node.js expert.",
    image: "https://picsum.photos/seed/team-priya/300/300",
  },
  {
    name: "Jordan Kim",
    role: "Lead Software Architect",
    bio: "Full-stack engineer obsessed with scalable systems. Designed microservices powering millions of requests daily. TypeScript advocate.",
    image: "https://picsum.photos/seed/team-jordan/300/300",
  },
  {
    name: "Sam Rivera",
    role: "Client Success Lead",
    bio: "Bridges the gap between technology and business goals. Ensures every client deployment is seamless, on time, and exceeds expectations.",
    image: "https://picsum.photos/seed/team-sam/300/300",
  },
];

const STATS = [
  { value: "2019", label: "Founded" },
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime SLA" },
];

const SERVICES = [
  {
    Icon: GraduationCap,
    title: "LMS Development",
    description:
      "Custom Learning Management Systems built from the ground up. SCORM/xAPI compliant, scalable to millions of learners, with rich analytics and gamification.",
    color: "bg-blue-500/15 text-blue-400",
  },
  {
    Icon: Code2,
    title: "Custom Software",
    description:
      "End-to-end software development tailored to your business. From architecture design to deployment — we own every layer of the stack.",
    color: "bg-emerald-500/15 text-emerald-400",
  },
  {
    Icon: LayoutDashboard,
    title: "Web Applications",
    description:
      "High-performance, accessible web apps built with Next.js, TypeScript, and modern UI frameworks. Optimised for speed, SEO, and conversion.",
    color: "bg-violet-500/15 text-violet-400",
  },
  {
    Icon: Zap,
    title: "API & Integrations",
    description:
      "RESTful and GraphQL APIs that connect your systems. Third-party integrations with Stripe, Zoom, Salesforce, HubSpot, and more.",
    color: "bg-amber-500/15 text-amber-400",
  },
];

const VALUES = [
  {
    Icon: ShieldCheck,
    title: "Reliability First",
    description:
      "We build systems designed to last. 99.9% SLA, automated testing, CI/CD pipelines, and 24/7 monitoring are non-negotiable standards.",
    color: "bg-blue-500/15 text-blue-400",
  },
  {
    Icon: Rocket,
    title: "Scale Without Limits",
    description:
      "From 100 to 10 million users — our architecture decisions ensure your platform grows with your ambition, never against it.",
    color: "bg-emerald-500/15 text-emerald-400",
  },
  {
    Icon: Lightbulb,
    title: "Cutting-Edge Tech",
    description:
      "We stay at the frontier. Next.js, AI integrations, real-time features, and cloud-native infrastructure are our everyday toolkit.",
    color: "bg-violet-500/15 text-violet-400",
  },
  {
    Icon: Users,
    title: "True Partnership",
    description:
      "We don't just write code and disappear. We become an extension of your team — embedded, accountable, and invested in your success.",
    color: "bg-amber-500/15 text-amber-400",
  },
];

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Node.js",
  "PostgreSQL", "Redis", "Docker", "AWS",
  "GraphQL", "Tailwind CSS", "Prisma", "Stripe",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-linear-to-br from-primary/8 via-background to-accent/10">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-sm font-semibold text-primary">
                <BookOpen className="h-3.5 w-3.5" />
                Scalable LMS &amp; Cutting-Edge Software
              </span>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                We build software
                <span className="block text-primary"> that transforms.</span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Nexist is a software development company specialising in
                scalable Learning Management Systems and custom digital
                platforms. We partner with businesses and educational
                institutions to turn complex challenges into elegant,
                performant software.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                >
                  See Our Work <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://www.nexist.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Visit nexist.info
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" as const }}
              className="relative hidden overflow-hidden rounded-3xl lg:block"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_with_banner_flogey.jpg"
                alt="Nexist team at work"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/40 to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-border/40 bg-card/90 px-4 py-3 shadow-lg backdrop-blur-sm"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold">40+ enterprise clients</p>
                  <p className="text-xs text-muted-foreground">trust Nexist globally</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* What We Do */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              What We Do
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              End-to-end software expertise
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              From bespoke LMS platforms to enterprise-grade web applications —
              we own the full stack and deliver production-ready software on
              time, every time.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ Icon, title, description, color }, i) => (
              <SectionReveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-xl"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <SectionReveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
                <Image
                  src="https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_with_banner_flogey.jpg"
                  alt="Nexist mission — building scalable software"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-transparent" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Mission
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Empowering education &amp; business through scalable technology.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                The e-learning market is exploding, yet most organisations still
                rely on off-the-shelf LMS tools that can&apos;t adapt to their
                unique workflows. Nexist exists to fix that.
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                We design and build custom platforms that fit your processes —
                not the other way around. Whether you&apos;re an enterprise
                upskilling thousands of employees or an EdTech startup launching
                to millions of learners, Nexist delivers the infrastructure and
                experience to get you there.
              </p>
              <Separator className="my-6" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "SCORM / xAPI Compliant", value: "100%" },
                  { label: "Client Retention Rate", value: "96%" },
                  { label: "Avg. Delivery Time Saved", value: "40%" },
                  { label: "Learners Served", value: "2M+" },
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

      {/* Tech Stack */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Technology
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Our tech stack
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              We build with modern, battle-tested technologies chosen for
              scalability, developer experience, and long-term maintainability.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH_STACK.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.06 }}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Values
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How we work
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
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
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
              The Team
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built by engineers, for engineers
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              A tight-knit team of senior engineers, designers, and client
              success managers who genuinely care about what they ship.
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
                  <p className="mt-0.5 text-sm font-medium text-primary">{role}</p>
                  <Separator className="my-3" />
                  <p className="text-xs leading-relaxed text-muted-foreground">{bio}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionReveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Let&apos;s build something great
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Ready to scale your platform?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
              Whether you need a custom LMS, a full-stack web application, or
              ongoing engineering support — Nexist is your team. Let&apos;s
              talk.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://www.nexist.info/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-white text-primary hover:bg-white/90"
                )}
              >
                Contact Nexist
              </a>
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 text-white hover:bg-white/10"
                )}
              >
                View Demo
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
