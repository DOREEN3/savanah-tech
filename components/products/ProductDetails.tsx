"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import type { Product, ProductVariant } from "@/types/product";
import ProductOptions from "./ProductOptions";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [quantity, setQuantity] = useState(1);

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | undefined>();

  const handleAddToCart = () => {
  dispatch(
    addToCart({
      product,
      variant: selectedVariant,
      quantity,
    })
  );
  toast.success(
    `${quantity} × ${product.name} added to cart`
  );
  setQuantity(1);
};
  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  return (
    <div>
      {/* Product Price */}
      <div className="mt-8">
        <p className="text-3xl font-bold">
          KSh{" "}
          {(selectedVariant?.price ?? product.price).toLocaleString()}
        </p>

        {product.originalPrice && !selectedVariant && (
          <p className="mt-1 text-lg text-muted line-through">
            KSh {product.originalPrice.toLocaleString()}
          </p>
        )}
      </div>

      {/* Variable Product Options */}
      {product.type === "variable" && (
        <ProductOptions
          product={product}
          onVariantChange={(variant) => {
            setSelectedVariant(variant);
          }}
        />
      )}

      {/* Quantity */}
      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">
          Quantity
        </p>

        <div className="flex w-fit items-center rounded-full border border-border">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="p-3 text-muted transition hover:text-primary"
            aria-label="Decrease quantity"
          >
            <Minus size={18} />
          </button>

          <span className="min-w-10 text-center font-medium">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="p-3 text-muted transition hover:text-primary"
            aria-label="Increase quantity"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.type === "variable" && !selectedVariant}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-black transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 sm:w-fit"
      >
        <ShoppingCart size={20} />

        {product.type === "variable" && !selectedVariant
          ? "Select Options"
          : "Add to Cart"}
      </button>
    </div>
  );
}