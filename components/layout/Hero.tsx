"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Watch } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-primary"
          >
            The future is here
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Technology
            <br />
            <span className="text-primary">for your world.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Discover powerful devices, smart accessories and modern
            technology designed to make everyday life simpler.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#shop"
              className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-black transition hover:bg-primary-hover"
            >
              Shop Now

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <button className="flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold transition hover:border-primary hover:text-primary">
              <Play size={16} />
              Discover More
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-wrap gap-8 border-t border-border pt-6"
          >
            <div>
              <p className="text-2xl font-bold">5K+</p>
              <p className="text-sm text-muted">Happy Customers</p>
            </div>

            <div>
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-muted">Products</p>
            </div>

            <div>
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-muted">Customer Rating</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="relative flex min-h-112.5 items-center justify-center"
        >
          {/* Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          {/* Product placeholder */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-80 w-80 items-center justify-center rounded-[3rem] border border-border bg-surface shadow-2xl sm:h-96 sm:w-96"
          >
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-3xl bg-surface-light">
                <Watch size={56} strokeWidth={1.5} className="text-primary" />
              </div>

              <p className="text-sm uppercase tracking-[0.25em] text-muted">
                Featured
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Smart Watch
              </h2>

              <p className="mt-2 font-semibold text-primary">
                From KSh 8,999
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}