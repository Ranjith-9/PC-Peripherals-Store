"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { Filtertype } from "@/types/filter";
import type { Product } from "@/types/product";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type MergedProduct = Product & {
  quantity: number;
};

type StoreContextType = {
  filters: Filtertype;
  setFilters: React.Dispatch<React.SetStateAction<Filtertype>>;

  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;

  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

  displayedProducts: Product[];

  mergedProducts: MergedProduct[];

  addToCart: (product: Product) => Promise<void>;

  incrementItem: (productId: string) => Promise<void>;

  decrementItem: (productId: string) => void;
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

  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Function to fetch products by their IDs
  async function fetchProductsbyIds(ids: string[]) {
    try {
      const res = await fetch("/api/cartproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      const data = await res.json();

      return data.products;
    } catch (error) {
      console.error("Failed to fetch products by IDs", error);
      return [];
    }
  }

  // ONLY refetch when product IDs change
  const productIds = cartItems.map((item) => item.productId).join(",");

  useEffect(() => {
    async function loadProducts() {
      if (cartItems.length > 0) {
        const ids = cartItems.map((item) => item.productId);

        const fetchedProducts = await fetchProductsbyIds(ids);

        setDisplayedProducts(fetchedProducts);
      } else {
        setDisplayedProducts([]);
      }
    }

    loadProducts();
  }, [productIds]);

  // MERGE quantity dynamically
  const mergedProducts = useMemo<MergedProduct[]>(() => {
    return displayedProducts.map((product: any) => {
      const cartItem = cartItems.find((item) => item.productId === product.id);

      return {
        ...product,
        quantity: cartItem?.quantity || 1,
      };
    });
  }, [displayedProducts, cartItems]);

  // Function to increment the cart value
  const incrementItem = async (productId: string) => {
    const cartItem = cartItems.find((item) => item.productId === productId);

    const currentQuantity = cartItem?.quantity || 0;

    const res = await fetch("/api/cart/increment", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        currentQuantity,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to increment item");
      return;
    }

    // ONLY update cartItems
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // Function to decrement the cart value
  const decrementItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Function to add item to cart (used in HomeView and ProductView)
  const addToCart = async (product: Product) => {
    const cartItem = cartItems.find((item) => item.productId === product.id);

    const currentQuantity = cartItem?.quantity ?? 0;

    try {
      const res = await fetch("/api/cart/increment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          currentQuantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to increment item");
        return;
      }

      if (cartItem) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        );
      } else {
        setCartItems((prev) => [
          ...prev,
          {
            productId: product.id,
            quantity: 1,
          },
        ]);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        filters,
        setFilters,
        cartOpen,
        setCartOpen,
        cartItems,
        setCartItems,
        displayedProducts,
        mergedProducts,
        incrementItem,
        decrementItem,
        addToCart,
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
