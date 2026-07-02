import { db } from "@/lib/db";
import type { CreateAddressInput } from "@/types/input";

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

export async function checkProducts(productIds: string[]) {
  const product = await db.product.findMany({
    where: { id: { in: productIds } },
  });
  return product;
}

export async function getAddress(email: string) {
  if (!email) return [];
  const userId = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  const address = await db.address.findMany({
    where: { userId: userId?.id },
  });
  return address;
}

export async function addAddress(userId: string, data: CreateAddressInput) {
  return await db.address.create({
    data: {
      userId: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      isDefault: data.isDefault ?? false,
    },
  });
}

export async function deleteAddress() {}
