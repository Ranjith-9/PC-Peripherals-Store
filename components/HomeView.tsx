"use client";
import { useState } from "react";
//Components
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import SortBar from "./SortBar";
import { useStore } from "@/providers/StoreProvider";

//Types
import type { Product } from "@/types/product";

interface HomeViewProps {
  initialProducts: Product[];
  categories: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export default function Home({ initialProducts, categories }: HomeViewProps) {
  const { cartItems, setCartItems } = useStore();

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

  // const removeFromCart = (productId: any) => {
  //   setCartItems((prevItems: any) =>
  //     prevItems.filter((item: any) => item.id !== productId),
  //   );
  // };

  return (
    <div>
      <div className="h-screen flex bg-gray-100">
        {/*Side bar*/}
        <div className="w-80 bg-gray-300">
          <SideBar categories={categories} />
        </div>
        {/*Main content*/}
        <div className="flex-1 bg-green-500">
          {/* Sort bar */}
          <div className="h-7 bg-pink-300">
            <SortBar />
          </div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid addToCart={addToCart} productData={initialProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
