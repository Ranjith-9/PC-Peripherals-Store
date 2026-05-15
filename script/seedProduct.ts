import { PrismaClient } from "@prisma/client";
import gamingProducts from "../DataSeed/seedData";

const prisma = new PrismaClient();

async function seedProducts() {
  try {
    await prisma.product.createMany({
      data: gamingProducts,
      skipDuplicates: true, // Skip if a product with the same ID already exists
    });
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
