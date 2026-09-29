"use client";

import { useDispatch, useSelector } from "react-redux";
import { Menu, X, ShoppingCart, Search, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState, AppDispatch } from "@/store";
import Link from "next/link";
import {
  toggleMobileMenu,
  closeMobileMenu,
  toggleCart,
  openCart,
} from "@/store/slices/uiSlice";

const navLinks = [
  { name: "Shop", href: "/#shop" },
  { name: "Categories", href: "/#categories" },
  { name: "Deals", href: "/#deals" },
  { name: "About", href: "/#about" },
];

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const isMobileMenuOpen = useSelector(
    (state: RootState) => state.ui.isMobileMenuOpen
  );

const cartItems = useSelector(
  (state: RootState) => state.cart.items
);

const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight"
          onClick={() => dispatch(closeMobileMenu())}
        >
          SAVANAH<span className="text-primary">.</span>TECH
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            aria-label="Search"
            className="text-muted transition-colors hover:text-primary"
          >
            <Search size={20} />
          </button>

          <button
            aria-label="Wishlist"
            className="text-muted transition-colors hover:text-primary"
          >
            <Heart size={20} />
          </button>

          <button
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative text-muted transition-colors hover:text-primary"
            onClick={() => dispatch(toggleCart())}
          >
            <ShoppingCart size={20} />

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Actions + Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            aria-label={`Shopping cart, ${cartCount} items`}
            onClick={() => dispatch(openCart())}
            className="relative text-muted transition-colors hover:text-primary"
          >
            <ShoppingCart size={22} />

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-black"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => dispatch(toggleMobileMenu())}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col px-6 py-6">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => dispatch(closeMobileMenu())}
                  className="border-b border-border py-4 text-sm text-muted transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-5 flex gap-6">
                <button className="flex items-center gap-2 text-sm text-muted">
                  <Search size={18} />
                  Search
                </button>

                <button
                  type="button"
                  onClick={() => {
                    dispatch(closeMobileMenu());
                    dispatch(openCart());
                  }}
                  className="relative flex items-center gap-2 text-sm text-muted">
                  <span className="relative">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-black">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </span>
                  Cart{cartCount > 0 ? ` (${cartCount})` : ""}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}