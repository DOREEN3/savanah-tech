"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, type RootState, type AppDispatch } from "./index";
import { hydrateCart } from "./slices/cartSlice";

function CartPersistence() {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("savanah-cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        dispatch(hydrateCart(parsedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }

    setHydrated(true);
  }, [dispatch]);

  // Save cart whenever it changes
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    localStorage.setItem(
      "savanah-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems, hydrated]);

  return null;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  );
}