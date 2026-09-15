"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section
      id="categories"
      className="border-b border-border bg-background py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Explore
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
              Shop by category
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-muted">
              Find the technology you need, from everyday essentials
              to the latest smart devices.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}