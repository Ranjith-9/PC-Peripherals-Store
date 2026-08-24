import { db } from "@/lib/db";
import type { CreateAddressInput } from "@/types/input";
import { Product } from "@prisma/client";

export async function getProducts(
  subcategory: string,
  filters: Record<string, string[]> = {},
  sort: string = "latest",
  search?: string,
  cursor?: string,
) {
  const filterConditions = Object.entries(filters)
    .filter(([, values]) => values.length > 0)
    .map(([filterName, values]) => ({
      filterValues: {
        some: {
          filterValue: {
            filterCategory: {
              name: filterName,
            },
            value: {
              in: values,
            },
          },
        },
      },
    }));

  const product = await db.product.findMany({
    take: 20,

    ...(cursor && {
      cursor: { id: cursor },
      skip: 1,
    }),

    where: {
      isActive: true,
      ...(subcategory && {
        subCategory: {
          slug: subcategory,
        },
      }),

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(filterConditions.length > 0 && {
        AND: filterConditions,
      }),
    },

    orderBy:
      sort === "price_asc"
        ? [{ price: "asc" }, { id: "desc" }]
        : sort === "price_desc"
          ? [{ price: "desc" }, { id: "desc" }]
          : [{ createdAt: "desc" }, { id: "desc" }],
  });
  return product;
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

export async function addProducts(data: Product) {
  return await db.product.create({
    data,
  });
}

export async function updateProduct(id: string, data: Product) {
  return await db.product.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProduct(id: string) {
  return await db.product.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}

export async function getProductAndFiltersByIds(id: string) {
  if (!id) return;
  return await db.product.findUnique({
    where: {
      id,
    },
    include: {
      filterValues: {
        include: {
          filterValue: true,
        },
      },

      subCategory: {
        include: {
          filterCategories: {
            include: {
              values: true,
            },
          },
        },
      },
    },
  });
}

export async function getFilters(category: string) {
  console.time("filterCategories query");
  console.time("filterValues query");
  const [filterCategories, filterValues] = await Promise.all([
    db.filterCategory
      .findMany({
        where: {
          subCategory: {
            slug: category,
          },
        },
        select: {
          id: true,
          name: true,
        },
      })
      .finally(() => {
        console.timeEnd("filterCategories query");
      }),

    db.filterValue
      .findMany({
        where: {
          filterCategory: {
            subCategory: {
              slug: category,
            },
          },
        },
        select: {
          value: true,
          filterCategoryId: true,
        },
      })
      .finally(() => {
        console.timeEnd("filterValues query");
      }),
  ]);

  return filterCategories.map((filterCategory: any) => ({
    name: filterCategory.name,
    values: filterValues
      .filter(
        (filterValue: any) =>
          filterValue.filterCategoryId === filterCategory.id,
      )
      .map((filterValue: any) => filterValue.value),
  }));
}
