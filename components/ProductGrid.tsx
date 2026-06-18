"use client";
import { useState, useEffect } from "react";
import ProductPanel from "./ProductPanel";
import type { Product } from "@/types/product";
import Link from "next/link";
import { useStore } from "@/providers/StoreProvider";

export default function ProductGrid({
  productData,
}: {
  productData: Product[];
}) {
  const [product, setProduct] = useState<Product[]>(productData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { filters, setFilters } = useStore();

  useEffect(() => {
    fetchProductsByCategory();
  }, [filters]);

  async function fetchProductsByCategory() {
    setLoading(true);
    try {
      const categories = filters.category || [];
      const param = new URLSearchParams();

      categories.forEach((category: string) => {
        param.append("category", category);
      });

      param.append("sort", filters.sort);

      if (filters.search) {
        param.append("search", filters.search);
      }

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
      const categories = filters.category || [];
      const param = new URLSearchParams();
      if (cursor) {
        param.append("cursor", cursor.toString());
      }
      categories.forEach((category: string) => {
        param.append("category", category);
      });
      param.append("sort", filters.sort);
      if (filters.search) {
        param.append("search", filters.search);
      }

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

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {product.map((item: Product, index: number) => (
          <div
            className="flex items-center justify-center"
            key={item.id ?? index}
          >
            <ProductPanel productData={item} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={loadMore} disabled={loading || !hasMore}>
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
}
