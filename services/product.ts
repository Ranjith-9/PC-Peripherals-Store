import { db } from "@/lib/db";

export async function getProducts(
  cursor?: string,
  category?: string[],
  sort: string = "latest",
) {
  const product = await db.product.findMany({
    take: 10,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    ...(category &&
      category.length > 0 && { where: { category: { in: category } } }),
    orderBy:
      sort === "price_asc"
        ? [{ price: "asc" }, { id: "desc" }]
        : sort === "price_desc"
          ? [{ price: "desc" }, { id: "desc" }]
          : [{ createdAt: "desc" }, { id: "desc" }],
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
