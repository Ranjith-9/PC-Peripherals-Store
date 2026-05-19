"use client";
import { useState, useEffect } from "react";
import ProductPanel from "./ProductPanel";

export default function ProductGrid({
  addToCart,
  productData,
  selectedCategory,
}: any) {
  const [product, setProduct] = useState(productData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchProductsByCategory();
  }, [selectedCategory]);

  async function fetchProductsByCategory() {
    setLoading(true);

    try {
      const categories = selectedCategory.Categories || [];
      const param = new URLSearchParams();
      categories.forEach((category: string) => {
        param.append("category", category);
      });
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
      const categories = selectedCategory.Categories || [];
      const param = new URLSearchParams();
      if (cursor) {
        param.append("cursor", cursor.toString());
      }
      categories.forEach((category: string) => {
        param.append("category", category);
      });

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
        {product.map((item: any, index: number) => (
          <div
            className="flex items-center justify-center"
            key={item.id ?? index}
          >
            <ProductPanel addToCart={addToCart} productData={item} />
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
