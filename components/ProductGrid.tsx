"use client";
import { useState } from "react";
import ProductPanel from "./ProductPanel";

export default function ProductGrid({ addToCart, productData }: any) {
  const [product, setProduct] = useState(productData);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const lastProduct = product[product.length - 1];
      const cursor = lastProduct ? lastProduct.id : undefined;
      const res = await fetch(`/api/products?cursor=${cursor}`);
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
