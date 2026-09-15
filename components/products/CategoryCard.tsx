"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({
  category,
  index,
}: CategoryCardProps) {
  return (
    <motion.a
      href={category.href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
    >
      {/* Icon */}
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-light text-2xl transition-colors group-hover:bg-primary/10">
        {category.icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold">
        {category.name}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-muted">
        {category.description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          Explore
        </span>

        <ArrowUpRight
          size={20}
          className="text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
        />
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.a>
  );
}