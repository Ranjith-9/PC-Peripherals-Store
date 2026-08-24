"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import type { Product } from "@prisma/client";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type MergedProduct = Product & {
  quantity: number;
};

/* =========================================================
   MAIN STORE CONTEXT
   ========================================================= */

type StoreContextType = {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;

  searchBarOpen: boolean;
  setSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>;

  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;

  placedOrder: any;
  setPlacedOrder: React.Dispatch<React.SetStateAction<any>>;

  displayedProducts: Product[];

  mergedProducts: MergedProduct[];

  incrementItem: (productId: string) => Promise<void>;

  decrementItem: (productId: string) => void;
};

/* =========================================================
   ACTIONS CONTEXT

   Components that only need these functions can subscribe
   here instead of subscribing to the entire StoreContext.
   ========================================================= */

type StoreActionsContextType = {
  addToCart: (product: Product, quantityToAdd?: number) => Promise<void>;

  deleteProduct: (productId: string) => Promise<void>;
};

const StoreContext = createContext<StoreContextType | null>(null);

const StoreActionsContext = createContext<StoreActionsContextType | null>(null);

/* =========================================================
   PROVIDER
   ========================================================= */

export function StoreProvider({ children }: { children: React.ReactNode }) {
  /* =======================================================
     BASIC STATE
     ======================================================= */

  const [cartOpen, setCartOpen] = useState(false);

  const [searchBarOpen, setSearchBarOpen] = useState(true);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [placedOrder, setPlacedOrder] = useState();

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  /* =======================================================
     CART REF

     Keeps the latest cartItems available to addToCart
     without making addToCart depend on cartItems.
     ======================================================= */

  const cartItemsRef = useRef<CartItem[]>(cartItems);

  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  /* =======================================================
     LOAD CART FROM LOCAL STORAGE
     ======================================================= */

  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  /* =======================================================
     LOAD PLACED ORDER FROM LOCAL STORAGE
     ======================================================= */

  useEffect(() => {
    const stored = localStorage.getItem("placedorder");

    if (stored) {
      setPlacedOrder(JSON.parse(stored));
    }
  }, []);

  /* =======================================================
     SAVE CART TO LOCAL STORAGE
     ======================================================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* =======================================================
     SAVE PLACED ORDER TO LOCAL STORAGE
     ======================================================= */

  useEffect(() => {
    if (placedOrder) {
      localStorage.setItem("placedorder", JSON.stringify(placedOrder));
    }
  }, [placedOrder]);

  /* =======================================================
     FETCH PRODUCTS BY IDS
     ======================================================= */

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

  /* =======================================================
     CART PRODUCT IDS

     Only changes when the actual product IDs change.
     Changing quantity does not trigger this effect.
     ======================================================= */

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

  /* =======================================================
     MERGED PRODUCTS
     ======================================================= */

  const mergedProducts = useMemo<MergedProduct[]>(() => {
    return displayedProducts.map((product) => {
      const cartItem = cartItems.find((item) => item.productId === product.id);

      return {
        ...product,
        quantity: cartItem?.quantity || 1,
      };
    });
  }, [displayedProducts, cartItems]);

  /* =======================================================
     INCREMENT ITEM
     ======================================================= */

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

  /* =======================================================
     DECREMENT ITEM
     ======================================================= */

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

  /* =======================================================
     ADD TO CART

     IMPORTANT:

     This function does NOT depend on cartItems.

     Instead it reads the latest cart through
     cartItemsRef.current.

     Therefore the function reference remains stable.
     ======================================================= */

  const addToCart = useCallback(
    async (product: Product, quantityToAdd: number = 1) => {
      const currentCartItems = cartItemsRef.current;

      const cartItem = currentCartItems.find(
        (item) => item.productId === product.id,
      );

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
            quantityToAdd,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Failed to increment item");
          return;
        }

        setCartItems((prev) => {
          const existingItem = prev.find(
            (item) => item.productId === product.id,
          );

          if (existingItem) {
            return prev.map((item) =>
              item.productId === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantityToAdd,
                  }
                : item,
            );
          }

          return [
            ...prev,
            {
              productId: product.id,
              quantity: quantityToAdd,
            },
          ];
        });
      } catch (err) {
        alert("Network error");
        console.error(err);
      }
    },
    [],
  );

  /* =======================================================
     DELETE PRODUCT

     Also stable because it doesn't depend on state.
     ======================================================= */

  const deleteProduct = useCallback(async (productId: string) => {
    const res = await fetch("/api/product/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
      }),
    });

    await res.json();

    alert("Product deleted successfully");
  }, []);

  /* =======================================================
     ACTION CONTEXT VALUE

     Because addToCart and deleteProduct are both stable,
     this object also remains stable.
     ======================================================= */

  const actionValue = useMemo(
    () => ({
      addToCart,
      deleteProduct,
    }),
    [addToCart, deleteProduct],
  );

  /* =======================================================
     MAIN STORE CONTEXT VALUE
     ======================================================= */

  const storeValue = useMemo(
    () => ({
      cartOpen,
      setCartOpen,

      searchBarOpen,
      setSearchBarOpen,

      cartItems,
      setCartItems,

      placedOrder,
      setPlacedOrder,

      displayedProducts,

      mergedProducts,

      incrementItem,
      decrementItem,
    }),
    [
      cartOpen,
      searchBarOpen,
      cartItems,
      placedOrder,
      displayedProducts,
      mergedProducts,
    ],
  );

  /* =======================================================
     PROVIDERS
     ======================================================= */

  return (
    <StoreContext.Provider value={storeValue}>
      <StoreActionsContext.Provider value={actionValue}>
        {children}
      </StoreActionsContext.Provider>
    </StoreContext.Provider>
  );
}

/* =========================================================
   MAIN STORE HOOK
   ========================================================= */

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}

/* =========================================================
   ACTIONS HOOK
   ========================================================= */

export function useStoreActions() {
  const context = useContext(StoreActionsContext);

  if (!context) {
    throw new Error("useStoreActions must be used within StoreProvider");
  }

  return context;
}
