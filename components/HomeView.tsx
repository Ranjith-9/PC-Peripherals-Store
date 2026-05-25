"use client";
import { useState } from "react";
//Components
import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import SortBar from "./SortBar";
import CartView from "./CartView";

//Types
import type { Filtertype } from "@/types/filter";
import type { Session } from "@/types/user";
import type { Product } from "@/types/product";

interface HomeViewProps {
  session: Session | null;
  initialProducts: Product[];
  categories: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export default function Home({
  session,
  initialProducts,
  categories,
}: HomeViewProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems: any[]) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.id,
      );

      // Product already exists
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }
      // New product
      return [
        ...prevItems,
        {
          productId: product.id,
          quantity: 1,
        },
      ];
    });
  };

  // const removeFromCart = (productId: any) => {
  //   setCartItems((prevItems: any) =>
  //     prevItems.filter((item: any) => item.id !== productId),
  //   );
  // };

  const [cartOpen, setCartOpen] = useState(false);

  const [filters, setFilters] = useState<Filtertype>({
    category: [],
    sort: "latest",
    search: "",
  });

  return (
    <div>
      <NavBar
        session={session}
        cartItems={cartItems}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="h-screen flex bg-gray-100">
        {/*Side bar*/}
        <div className="w-80 bg-gray-300">
          <SideBar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        {/*Main content*/}
        <div className="flex-1 bg-green-500">
          {/* Sort bar */}
          <div className="h-7 bg-pink-300">
            <SortBar filters={filters} setFilters={setFilters} />
          </div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid
              addToCart={addToCart}
              productData={initialProducts}
              filters={filters}
            />
            {/* Cart */}
            <CartView
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
