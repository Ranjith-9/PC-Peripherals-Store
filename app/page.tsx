import HomeView from "@/components/HomeView";
import { getCategory, getProducts } from "@/services/product";
import { getServerSession } from "next-auth";
import type { Product } from "@/types/product";
import type { Session } from "@/types/user";

export default async function Home() {
  const session: Session | null = await getServerSession();
  const productFromDatabase: Product[] = await getProducts();
  const productCategory: string[] = await getCategory();

  return (
    <div>
      <HomeView
        session={session}
        initialProducts={productFromDatabase}
        categories={productCategory}
      />
    </div>
  );
}
