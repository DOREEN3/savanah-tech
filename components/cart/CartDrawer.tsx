"use client";

import {AnimatePresence, motion} from "framer-motion";  
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import {useDispatch,useSelector} from "react-redux";
import type{RootState,AppDispatch} from  "@/store";
import {closeCart} from "@/store/slices/uiSlice";
import {
  removeFromCart,
  updateQuantity,
} from "@/store/slices/cartSlice";

export default function CartDrawer() {
  const dispatch = useDispatch<AppDispatch>();

  const isCartOpen = useSelector(
    (state: RootState) => state.ui.isCartOpen
  );

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const cartTotal = cartItems.reduce(
    (total, item) => {
      const price = item.variant?.price ?? item.product.price;

      return total + price * item.quantity;
    },
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 250,
            }}
        className="fixed inset-y-0 right-0 z-70 flex w-full max-w-md flex-col overflow-hidden border-l border-border bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingCart
                  size={20}
                  className="text-primary"
                />

                <h2 className="text-lg font-semibold">
                  Your Cart
                </h2>

                <span className="text-sm text-muted">
                  ({cartItems.length})
                </span>
              </div>

              <button
                type="button"
                onClick={() => dispatch(closeCart())}
                className="rounded-full p-2 text-muted transition hover:bg-surface-light hover:text-foreground"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-light">
                    <ShoppingCart
                      size={28}
                      className="text-muted"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                    Add some products and they will appear
                    here.
                  </p>

                  <button
                    type="button"
                    onClick={() => dispatch(closeCart())}
                    className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-black transition hover:bg-primary-hover"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((item) => {
                    const price =
                      item.variant?.price ??
                      item.product.price;

                    return (
                      <div
                        key={`${item.product.id}-${item.variant?.id ?? "simple"}`}
                        className="rounded-2xl border border-border bg-surface p-4"
                      >
                        <div className="flex gap-4">
                          {/* Product Image Placeholder */}
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-surface-light text-3xl">
                            📦
                          </div>

                          {/* Product Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-medium">
                                  {item.product.name}
                                </h3>

                                {item.variant && (
                                  <p className="mt-1 text-xs text-muted">
                                    {Object.entries(
                                      item.variant.options
                                    )
                                      .map(
                                        ([key, value]) =>
                                          `${key}: ${value}`
                                      )
                                      .join(" • ")}
                                  </p>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    removeFromCart({
                                      productId:
                                        item.product.id,
                                      variantId:
                                        item.variant?.id,
                                    })
                                  )
                                }
                                className="shrink-0 text-muted transition hover:text-red-400"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              {/* Quantity */}
                              <div className="flex items-center rounded-full border border-border">
                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(
                                      updateQuantity({
                                        productId:
                                          item.product.id,
                                        variantId:
                                          item.variant?.id,
                                        quantity: Math.max(
                                          1,
                                          item.quantity - 1
                                        ),
                                      })
                                    )
                                  }
                                  className="p-2 text-muted transition hover:text-primary"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={15} />
                                </button>

                                <span className="min-w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    dispatch(
                                      updateQuantity({
                                        productId:
                                          item.product.id,
                                        variantId:
                                          item.variant?.id,
                                        quantity:
                                          item.quantity + 1,
                                      })
                                    )
                                  }
                                  className="p-2 text-muted transition hover:text-primary"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={15} />
                                </button>
                              </div>

                              {/* Price */}
                              <p className="font-semibold">
                                KSh{" "}
                                {(
                                  price * item.quantity
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-border bg-surface px-6 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">
                    Subtotal
                  </span>

                  <span className="text-xl font-bold">
                    KSh {cartTotal.toLocaleString()}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted">
                  Shipping and taxes calculated at checkout.
                </p>

                <button
                  type="button"
                  className="mt-5 w-full rounded-full bg-primary px-6 py-4 font-semibold text-black transition hover:bg-primary-hover"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
