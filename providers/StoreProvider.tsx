"use client";

import { createContext, useContext, useState } from "react";
import type { Filtertype } from "@/types/filter";

export type CartItem = {
  productId: string;
  quantity: number;
};

type StoreContextType = {
  filters: Filtertype;
  setFilters: React.Dispatch<React.SetStateAction<Filtertype>>;

  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;

  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filtertype>({
    category: [],
    sort: "latest",
    search: "",
  });

  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <StoreContext.Provider
      value={{
        filters,
        setFilters,
        cartOpen,
        setCartOpen,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
