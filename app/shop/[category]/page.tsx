import HomeView from "@/components/HomeView";
import { getProducts, getFilters } from "@/services/product";

export default async function category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const [product, filters] = await Promise.all([
    getProducts(category, {}),
    getFilters(category),
  ]);

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
