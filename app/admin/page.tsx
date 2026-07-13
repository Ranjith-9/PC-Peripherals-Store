import AdminDashboard from "@/components/AdminDashboard";
import { getCategory, getProducts } from "@/services/product";
import type { Product } from "@prisma/client";

export default async function admin() {
  const productFromDatabase: Product[] = await getProducts();
  const productCategory: string[] = await getCategory();
  return (
    <div className="bg-gray-700 h-screen">
      <AdminDashboard
        initialProducts={productFromDatabase}
        categories={productCategory}
      />
    </div>
  );
}
