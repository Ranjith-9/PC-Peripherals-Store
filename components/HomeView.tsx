"use client";

import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import CartView from "./CartView";

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
          <SideBar categories={categories} />
        </div>
        {/*Main content*/}
        <div className="flex-1 bg-green-500">
          {/* Sort bar */}
          <div className="h-0 bg-pink-300"></div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid addToCart={addToCart} productData={initialProducts} />
            {/* Cart */}
            <CartView cartOpen={cartOpen} setCartOpen={setCartOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}
