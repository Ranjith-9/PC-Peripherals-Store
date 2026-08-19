"use client";
import { useState, useEffect, useRef } from "react";
import ProductPanel from "./ProductPanel";
import type { Product } from "@prisma/client";
import { useStore } from "@/providers/StoreProvider";
import { Filtertype } from "@/providers/StoreProvider";

interface productGridProps {
  productData: Product[];
  isAdmin?: boolean;
  mainCategory: string;
}

export default function ProductGrid({
  productData,
  isAdmin = false,
  mainCategory,
}: productGridProps) {
  const [product, setProduct] = useState<Product[]>(productData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { filters, setFilters } = useStore();
  const firstRender = useRef(true);

  //callback function to update products when edited or deleted

  const handleProductUpdate = (updatedProduct: any) => {
    setProduct((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const handleProductDelete = (productId: any) => {
    setProduct((prev) => prev.filter((p) => p.id !== productId));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const hasActiveFilters =
      filters.search !== "" ||
      filters.subcategory !== "" ||
      filters.sort !== "latest" ||
      Object.keys(filters.filters).length > 0;

    if (!hasActiveFilters) {
      return;
    }
    console.log("fetchProductsByCategory called", mainCategory);
    fetchProductsByCategory();
  }, [filters, mainCategory]);

  async function fetchProductsByCategory() {
    setLoading(true);
    try {
      const param = filtersToSearchParams(filters, mainCategory);

      const res = await fetch(`/api/products?${param.toString()}`);
      const data = await res.json();

      setProduct(data.products);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    // needs to be changed to fit the category filter
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const lastProduct = product[product.length - 1];
      const cursor = lastProduct ? lastProduct.id : undefined;

      const param = filtersToSearchParams(filters, mainCategory, cursor);

      const res = await fetch(`/api/products?${param.toString()}`);

      const data = await res.json();
      setProduct((prev: any) => [...prev, ...data.products]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setLoading(false);
    }
  }

  function filtersToSearchParams(
    filters: Filtertype,
    mainCategory?: string,
    cursor?: any,
  ) {
    const param = new URLSearchParams();

    // Normal Filters
    if (mainCategory) {
      param.set("subcategory", mainCategory);
    }
    if (filters.sort) {
      param.set("sort", filters.sort);
    }

    if (filters.search) {
      param.set("search", filters.search);
    }

    if (cursor) {
      param.append("cursor", cursor.toString());
    }

    // Dynamic Filters

    Object.entries(filters.filters).forEach(([filterName, values]) => {
      values.forEach((value) => {
        param.append(filterName, value);
      });
    });
    return param;
  }

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {product.map((item: Product, index: number) => (
          <div key={item.id ?? index}>
            <ProductPanel
              productData={item}
              isAdmin={isAdmin}
              onUpdate={handleProductUpdate}
              onDelete={handleProductDelete}
            />
          </div>
        ))}
      </div>
      <div className="m">
        <button
          onClick={loadMore}
          disabled={loading || !hasMore}
          className="bg-black text-white px-7 py-4 rounded-md shadow-md ml-5 mt-5"
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
}
