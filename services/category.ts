import { db } from "@/lib/db";
import type { MainCategory } from "@prisma/client";

// export async function getMainCategories() {
//   const categoryNames = (
//     await db.mainCategory.findMany({
//       select: {
//         name: true,
//       },
//     })
//   ).map((c: MainCategory) => c.name);
//   return categoryNames;
// }

export async function getMainSubCategory() {
  const Categories = await db.mainCategory.findMany({
    include: {
      subCategories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  const result = Categories.map((category: any) => ({
    name: category.name,
    subcategories: category.subCategories.map((sub: any) => sub.name),
    slug: category.subCategories.map((sub: any) => sub.slug),
  }));
  return result;
}
