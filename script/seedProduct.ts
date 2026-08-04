import { PrismaClient } from "@prisma/client";
import gamingProducts from "../DataSeed/seedData";
import slugify from "slugify";

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    // Seed Products
    await prisma.product.createMany({
      data: gamingProducts,
      skipDuplicates: true, // Skip if a product with the same ID already exists
    });

    // Retrive Products

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Slugify Products

    for (const product of products) {
      const slug = `${slugify(product.name, {
        lower: true,
        strict: true,
      })}-${product.id}`;

      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          slug,
        },
      });
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
