import { db } from "@/lib/db";
import HomeView from "@/components/HomeView";

import { getProducts, getFilters } from "@/services/product";

export default async function category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  console.time("TOTAL PAGE");

  const { category } = await params;

  console.time("getProducts");
  console.time("getFilters");

  const [product, filters] = await Promise.all([
    getProducts(category, {}).finally(() => {
      console.timeEnd("getProducts");
    }),

    getFilters(category).finally(() => {
      console.timeEnd("getFilters");
    }),
  ]);

  console.timeEnd("TOTAL PAGE");

  return (
    <div>
      <HomeView
        initialProducts={product}
        mainCategory={category}
        categoryFilters={filters}
      />
    </div>
  );
}
