import HomeView from "@/components/HomeView";
import { getCategory, getProducts } from "@/services/product";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log("current session", session);

  const productFromDatabase = await getProducts();
  const productCategory = await getCategory();

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
