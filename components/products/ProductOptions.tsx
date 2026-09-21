"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/types/product";

interface ProductOptionsProps {
  product: Product;
  onAddToCart: (variant: ProductVariant) => void;
}

export default function ProductOptions({
  product,
  onAddToCart,
}: ProductOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionChange = (
    optionName: string,
    value: string
  ) => {
    setSelectedOptions((current) => ({
      ...current,
      [optionName]: value,
    }));
  };

  const selectedVariant = product.variants?.find((variant) =>
    Object.entries(variant.options).every(
      ([key, value]) => selectedOptions[key] === value
    )
  );

  return (
    <div className="mt-4 space-y-4">
      {product.options?.map((option) => (
        <div key={option.name}>
          <p className="mb-2 text-sm font-medium">
            {option.name}
          </p>

          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected =
                selectedOptions[option.name] === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    handleOptionChange(option.name, value)
                  }
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    isSelected
                      ? "border-primary bg-primary text-black"
                      : "border-border text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedVariant && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-bold">
                KSh {selectedVariant.price.toLocaleString()}
              </p>

              <p className="text-xs text-muted">
                SKU: {selectedVariant.sku}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(selectedVariant)}
              disabled={selectedVariant.stock === 0}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {selectedVariant.stock > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}