import AddProductForm from "./AddProductForm";
import type { Product } from "@prisma/client";
import UpdateProducts from "./UpdateProducts";

interface AdminDashboardProps {
  initialProducts: Product[];
  categories: string[];
}

export default function AdminDashboard({
  initialProducts,
  categories,
}: AdminDashboardProps) {
  return (
    <div>
      {/* <AddProductForm isEdit={true} /> */}
      <UpdateProducts
        initialProducts={initialProducts}
        categories={categories}
      />
    </div>
  );
}
