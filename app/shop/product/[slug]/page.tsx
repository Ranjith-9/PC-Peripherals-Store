import ProductView from "@/components/ProductView";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductView Product={product} />
    </div>
  );
}
