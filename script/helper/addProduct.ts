import { Prisma } from "@prisma/client";

export async function addProduct(
  tx: Prisma.TransactionClient,
  data: any,
  subCatId: string,
) {
  const product = await tx.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock,
      description: data.description,
      attributes: data.attributes,
      imageUrl: data.imageUrl,
      subCategoryId: subCatId,
    },
  });

  return product.id;
}

export async function createFilter(
  tx: Prisma.TransactionClient,
  filterName: string,
  subCatId: string,
) {
  const filter = await tx.filterCategory.create({
    data: {
      name: filterName,
      subCategoryId: subCatId,
    },
  });

  return filter.id;
}

export async function createFilterValue(
  tx: Prisma.TransactionClient,
  filterId: string,
  value: any,
) {
  const filterValue = await tx.filterValue.create({
    data: {
      value: value,
      filterCategoryId: filterId,
    },
  });

  return filterValue.id;
}

export async function createProductFilterValue(
  tx: Prisma.TransactionClient,
  filterValueId: string,
  productId: string,
) {
  await tx.productFilterValue.create({
    data: {
      productId: productId,
      filterValueId: filterValueId,
    },
  });
}
