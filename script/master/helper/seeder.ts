import { Prisma } from "@prisma/client";

import {
  addProduct,
  createFilter,
  createFilterValue,
  createProductFilterValue,
} from "../../helper/addProduct";

export async function seedStuff(
  tx: Prisma.TransactionClient,
  categoryID: string,
  data: any,
  name: string,
) {
  try {
    const items = data;

    // filter name -> filterCategoryId
    const filterCategoryMap = new Map<string, string>();

    // "filterName:value" -> filterValueId
    const filterValueMap = new Map<string, string>();

    for (const item of items) {
      const productId = await addProduct(tx, item, categoryID);

      for (const [key, value] of Object.entries(item.filters)) {
        // FILTER CATEGORY

        if (!filterCategoryMap.has(key)) {
          const fcId = await createFilter(tx, key, categoryID);

          filterCategoryMap.set(key, fcId);
        }

        const fcId = filterCategoryMap.get(key)!;

        // FILTER VALUE

        const pairKey = `${key}:${value}`;

        if (!filterValueMap.has(pairKey)) {
          const fvId = await createFilterValue(tx, fcId, value);

          filterValueMap.set(pairKey, fvId);
        }

        const fvId = filterValueMap.get(pairKey)!;

        // PRODUCT <-> FILTER VALUE

        await createProductFilterValue(tx, fvId, productId);
      }
    }

    console.log(`Seeded ${name} successfully`);
  } catch (error) {
    console.error(`Error seeding ${name}:`, error);
    throw error;
  }
}
