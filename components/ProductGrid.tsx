"use client";
import { useState, useEffect } from "react";
import ProductPanel from "./ProductPanel";
import type { Product } from "@prisma/client";
import { useStore } from "@/providers/StoreProvider";

interface productGridProps {
  productData: Product[];
  isAdmin?: boolean;
}

export default function ProductGrid({
  productData,
  isAdmin = false,
}: productGridProps) {
  const [product, setProduct] = useState<Product[]>(productData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { filters, setFilters } = useStore();

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
    console.log("fetchProductsByCategory called");
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
