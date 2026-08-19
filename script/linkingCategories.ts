import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function linkingCategories() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        category: true,
      },
    });

    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const categoryMap = new Map<string, string>();

    categories.forEach((category) => {
      categoryMap.set(category.name, category.id);
    });

    for (const product of products) {
      const categoryId = categoryMap.get(product.category);

      if (!categoryId) {
        console.warn(`category not found for ${product.category}`);
        continue;
      }

      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          categoryId,
        },
      });
    }
    console.log("Migration done succesfully");
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

linkingCategories();
