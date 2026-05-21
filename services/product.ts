import { db } from "@/lib/db";

export async function getProducts(
  cursor?: string,
  category?: string[],
  sort: string = "latest",
  search?: string,
) {
  const product = await db.product.findMany({
    take: 10,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    ...(category &&
      category.length > 0 && { where: { category: { in: category } } }),
    ...(search && {
      where: { name: { contains: search, mode: "insensitive" } },
    }),
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

export async function getProductByIds(ids: string[]) {
  const product = await db.product.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return product;
}

export async function checkProductStock(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
  });
  return product.stock;
}
