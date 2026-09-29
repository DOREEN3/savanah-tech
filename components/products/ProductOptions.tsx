"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import { RotateCcw } from "lucide-react";

interface ProductOptionsProps {
  product: Product;
  onVariantChange: (variant: ProductVariant | undefined) => void;
}

export default function ProductOptions({
  product,
  onVariantChange,
}: ProductOptionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const [combinationUnavailable, setCombinationUnavailable] =
    useState(false);

  const handleOptionChange = (
    optionName: string,
    value: string
  ) => {
    const newSelections = {
      ...selectedOptions,
      [optionName]: value,
    };

    /*
     * Remove selections that no longer work
     * with the newly selected option.
     */
    const cleanedSelections: Record<string, string> = {
      [optionName]: value,
    };

    product.options?.forEach((option) => {
      if (option.name === optionName) {
        return;
      }

      const currentValue = selectedOptions[option.name];

      if (!currentValue) {
        return;
      }

      const stillValid = product.variants?.some((variant) =>
        Object.entries(newSelections).every(
          ([key, selectedValue]) =>
            !selectedValue ||
            variant.options[key] === selectedValue
        )
      );

      if (stillValid) {
        cleanedSelections[option.name] = currentValue;
      }
    });

    setSelectedOptions(cleanedSelections);

    /*
     * Check whether all options have been selected.
     */
    const allOptionsSelected = product.options?.every(
      (option) => cleanedSelections[option.name]
    );

    if (!allOptionsSelected) {
      setCombinationUnavailable(false);
      onVariantChange(undefined);
      return;
    }

    /*
     * Find the exact matching variant.
     */
    const selectedVariant = product.variants?.find((variant) =>
      Object.entries(variant.options).every(
        ([key, variantValue]) =>
          cleanedSelections[key] === variantValue
      )
    );

    if (selectedVariant) {
      setCombinationUnavailable(false);
      onVariantChange(selectedVariant);
    } else {
      setCombinationUnavailable(true);
      onVariantChange(undefined);
    }
  };

  const isOptionAvailable = (
    optionName: string,
    value: string
  ) => {
    return (
      product.variants?.some((variant) => {
        if (variant.options[optionName] !== value) {
          return false;
        }

        return Object.entries(selectedOptions).every(
          ([key, selectedValue]) => {
            if (key === optionName) {
              return true;
            }

            return (
              !selectedValue ||
              variant.options[key] === selectedValue
            );
          }
        );
      }) ?? false
    );
  };

  const handleReset = () => {
  setSelectedOptions({});
  setCombinationUnavailable(false);
  onVariantChange(undefined);
};

  return (
    <div className="mt-6 space-y-5">
      {Object.keys(selectedOptions).length > 0 && (
  <div className="flex items-center justify-between">
    <button
      type="button"
      onClick={handleReset}
      className="text-sm text-muted transition hover:text-primary"
    >
      <RotateCcw size={16} />
      Reset selections
    </button>
  </div>
)}
      {product.options?.map((option) => (
        <div key={option.name}>
          <p className="mb-2 text-sm font-medium">
            {option.name}
          </p>

          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected =
                selectedOptions[option.name] === value;

              const isAvailable = isOptionAvailable(
                option.name,
                value
              );

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    handleOptionChange(option.name, value)
                  }
                  disabled={!isAvailable}
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    isSelected
                      ? "border-primary bg-primary text-black"
                      : isAvailable
                      ? "border-border text-muted hover:border-primary hover:text-primary"
                      : "cursor-not-allowed border-border text-muted opacity-30 line-through"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {combinationUnavailable && (
        <p className="text-sm text-red-400">
          This combination is currently unavailable.
        </p>
      )}
    </div>
  );
}