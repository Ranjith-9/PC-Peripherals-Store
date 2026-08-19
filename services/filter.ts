import { db } from "@/lib/db";

export async function checkKeyInFC(name: string, subCategoryId: string) {
  const existing = await db.filterCategory.findFirst({
    where: {
      name,
      subCategoryId,
    },
  });
  if (existing === null) {
    return false;
  }
  console.log("from the backedn", existing);
  return existing;
}

export async function addFilterCategory(name: string, subCategoryId: string) {
  const createdRow = await db.filterCategory.create({
    data: { name, subCategoryId },
  });

  return createdRow.id;
}

export async function addFilterValue(filterCategoryId: string, value: string) {
  const createdRow = await db.filterValue.create({
    data: {
      value,
      filterCategoryId,
    },
  });

  return createdRow.id;
}

export async function linkPFV(filterValueId: string, productId: string) {
  try {
    await db.ProductFilterValue.create({
      data: {
        filterValueId,
        productId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function unlinkPFV(filterValueId: string, productId: string) {
  try {
    await db.ProductFilterValue.delete({
      where: {
        productId_filterValueId: { productId, filterValueId },
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function checkFilterValue(
  filterCategoryId: string,
  value: string,
) {
  try {
    const exisiting = await db.filterValue.findFirst({
      where: {
        value,
        filterCategoryId,
      },
    });

    if (exisiting === null) {
      return false;
    }
    console.log("checkfiltervalue", exisiting);
    return exisiting;
  } catch (error) {
    console.log(error);
    return error;
  }
}
