import HomeView from "@/components/HomeView";
import { getCategory, getProducts } from "@/services/product";
import type { Product } from "@/types/product";

export default async function Home() {
  const productFromDatabase: Product[] = await getProducts();
  const productCategory: string[] = await getCategory();

  return (
    <div>
      <HomeView
        initialProducts={productFromDatabase}
        categories={productCategory}
      />
    </div>
  );
}
