"use client";

import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import CartView from "./CartView";
import type { Filtertype } from "@/types/filter";
import SortBar from "./SortBar";

export default function Home({ session, initialProducts, categories }: any) {
  const [cartItems, setCartItems]: any = useState([]);

  const addToCart = (product: any) => {
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

  const removeFromCart = (productId: any) => {
    setCartItems((prevItems: any) =>
      prevItems.filter((item: any) => item.id !== productId),
    );
  };

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
        addToCart={addToCart}
        removeFromCart={removeFromCart}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
