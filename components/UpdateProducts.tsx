"use client";

import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import SortBar from "./SortBar";

import type { Product } from "@prisma/client";

interface updateProductsProps {
  initialProducts: Product[];
  categoryFilters: any;
  mainCategory: string;
}

export default function UpdateProducts({
  categoryFilters,
  initialProducts,
  mainCategory,
}: updateProductsProps) {
  return (
    <div>
      <div className="h-screen flex bg-gray-100">
        {/*Main content*/}
        <div className="flex-1 bg-black-500">
          {/* Sort bar */}
          <div className="h-7 bg-cyan-300">
            <SortBar />
          </div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid
              productData={initialProducts}
              mainCategory={mainCategory}
              isAdmin={true}
            />
          </div>
        </div>
        {/*Side bar*/}
        <div className="w-50 bg-gray-300">
          <SideBar categoryFilters={categoryFilters} />
        </div>
      </div>
    </div>
  );
}
