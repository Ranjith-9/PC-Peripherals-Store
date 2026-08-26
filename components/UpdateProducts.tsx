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
      <div className="h-screen flex">
        {/*Main content*/}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="h-7 ml-6 ">
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
        <div className="w-60 border-l">
          <SideBar categoryFilters={categoryFilters} />
        </div>
      </div>
    </div>
  );
}
