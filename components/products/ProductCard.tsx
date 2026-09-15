"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import type { product } from "@/types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

interface ProductCardProps {
  product: product;
  index: number;
}


export default function ProductCard({
  product,
  index,
}: ProductCardProps) {
    
    const dispatch = useDispatch();
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* Product image */}
      <div className="relative flex h-72 items-center justify-center bg-surface-light">
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black">
            {product.badge}
          </span>
        )}

        <div className="text-7xl transition-transform duration-500 group-hover:scale-110">
          📦
        </div>
      </div>

      {/* Product information */}
      <div className="p-5">
        <p className="text-xs uppercase tracking-wider text-muted">
          {product.category}
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-muted">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star
              size={15}
              className="fill-primary text-primary"
            />

            <span className="text-sm font-medium">
              {product.rating}
            </span>
          </div>

          <span className="text-sm text-muted">
            ({product.review})
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold">
              KSh {product.price.toLocaleString()}
            </p>

            {product.originalPrice && (
              <p className="text-sm text-muted line-through">
                KSh {product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>

          <button
            aria-label={`Add ${product.name} to cart`}
            onClick={() => dispatch(addToCart(product))}
            className="rounded-full bg-primary p-3 text-black transition hover:bg-primary-hover"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}