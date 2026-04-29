"use client";

import { SectionReveal } from "@/components/shared/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import { useState } from "react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-primary py-20">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Mail className="h-7 w-7 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-white/70">
            Get early access to new arrivals, exclusive deals, and insider
            picks. Join 10,000+ subscribers.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-white/15 px-6 py-4"
            >
              <CheckCircle className="h-5 w-5 text-white" />
              <p className="font-semibold text-white">
                You&apos;re subscribed. Welcome to the club!
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white focus-visible:ring-white/30"
              />
              <Button
                type="submit"
                className="h-11 shrink-0 gap-2 bg-white text-primary hover:bg-white/90"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/50">
            No spam, ever. Unsubscribe with one click at any time.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
