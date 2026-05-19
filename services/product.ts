import { db } from "@/lib/db";

export async function getProducts(cursor?: string, category?: string[]) {
  const product = await db.product.findMany({
    take: 10,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    ...(category &&
      category.length > 0 && { where: { category: { in: category } } }),
    orderBy: { id: "asc" },
  });
  return product;
}

export async function getCategory() {
  const category = await db.product.findMany({
    distinct: ["category"],
    select: {
      category: true,
    },
  });
  return category.map((item: any) => item.category);
}
