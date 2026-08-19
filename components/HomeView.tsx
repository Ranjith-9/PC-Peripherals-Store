"use client";

//Components
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import SortBar from "./SortBar";
import CategoryBar from "@/components/CategoryBar";
import { useState, useEffect } from "react";
//Types
import type { Product } from "@prisma/client";

interface HomeViewProps {
  initialProducts: Product[];
  mainCategory: string;
  categoryFilters: any;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export default function Home({
  initialProducts,
  mainCategory,
  categoryFilters,
}: HomeViewProps) {
  const [sidebarOpen, setSideBarOpen] = useState(true);

  return (
    <div className="">
      {/* <div className="flex py-1 bg-slate-300">
        <CategoryBar mainCategory={mainCategory} />
      </div> */}
      <div className="h-screen flex bg-gray-100">
        {/*Side bar*/}
        <div
          className={`relative bg-white transition-all duration-300 ${sidebarOpen ? "w-70" : "w-0"}`}
        >
          <div
            className={`w-70 h-full transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <SideBar categoryFilters={categoryFilters} />
          </div>

          <button
            className="absolute top-1/2 -right-5 z-20 h-10 w-10 bg-black shadow-lg rounded-full"
            onClickCapture={() => setSideBarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>
        {/*Main content*/}
        <div className="flex-1 bg-gray-500">
          {/* Sort bar */}
          <div className="h-7 bg-white mt-2 mx-4 flex items-center justify-end">
            <SortBar />
          </div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid
              productData={initialProducts}
              mainCategory={mainCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
