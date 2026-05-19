"use client";

import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import CartView from "./CartView";
import type { Filtertype } from "@/types/filter";

export default function Home({ session, initialProducts, categories }: any) {
  const [cartItems, setCartItems]: any = useState([]);

  const addToCart = (product: any) => {
    setCartItems((prevItems: any) => [...prevItems, product]);
  };

  const removeFromCart = (productId: any) => {
    setCartItems((prevItems: any) =>
      prevItems.filter((item: any) => item.id !== productId),
    );
  };

  const [cartOpen, setCartOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState([]);

  const [filters, setFilters] = useState<Filtertype>({
    category: [],
    sort: "latest",
    search: "",
  });

  console.log("selected category in home view", selectedCategory);
  return (
    <div>
      <NavBar
        session={session}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
      />
      <div className="h-screen flex bg-gray-100">
        {/*Side bar*/}
        <div className="w-80 bg-gray-300">
          <SideBar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        {/*Main content*/}
        <div className="flex-1 bg-green-500">
          {/* Sort bar */}
          <div className="h-0 bg-pink-300"></div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid
              addToCart={addToCart}
              productData={initialProducts}
              selectedCategory={selectedCategory}
              filters={filters}
            />
            {/* Cart */}
            <CartView cartOpen={cartOpen} setCartOpen={setCartOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}
