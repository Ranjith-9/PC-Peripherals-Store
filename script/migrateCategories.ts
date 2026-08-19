import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function migrateCategories() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        category: true,
      },
    });

    const categoryNames = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categoryNames)];

    const categories = uniqueCategories.map((category) => ({
      name: category,
      slug: slugify(category, {
        lower: true,
        strict: true,
      }),
    }));
    console.log(categories);

    await prisma.category.createMany({
      data: categories,
    });

    console.log("prisma ran successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateCategories();

//done, will not be used in the future
