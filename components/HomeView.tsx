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
            <ProductGrid productData={initialProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
