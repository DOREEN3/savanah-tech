import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductVariant } from "@/types/product";

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        variant?: ProductVariant;
      }>
    ) => {
      const { product, variant } = action.payload;

      const existingItem = state.items.find((item) => {
        if (item.product.id !== product.id) {
          return false;
        }

        if (!variant && !item.variant) {
          return true;
        }

        if (!variant || !item.variant) {
          return false;
        }

        return variant.id === item.variant.id;
      });

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          variant,
          quantity: 1,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId?: number;
      }>
    ) => {
      state.items = state.items.filter((item) => {
        if (item.product.id !== action.payload.productId) {
          return true;
        }

        if (!action.payload.variantId && !item.variant) {
          return false;
        }

        if (
          action.payload.variantId &&
          item.variant?.id === action.payload.variantId
        ) {
          return false;
        }

        return true;
      });
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        variantId?: number;
        quantity: number;
      }>
    ) => {
      const item = state.items.find((item) => {
        if (item.product.id !== action.payload.productId) {
          return false;
        }

        if (!action.payload.variantId && !item.variant) {
          return true;
        }

        return item.variant?.id === action.payload.variantId;
      });

      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;