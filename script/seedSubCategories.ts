import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedCategory() {
  try {
    await prisma.subCategory.createMany({
      data: [
        {
          name: "Processor",
          slug: "processor",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "Motherboard",
          slug: "motherboard",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "Graphics Card",
          slug: "graphics-card",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "RAM",
          slug: "ram",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "Computer Storage",
          slug: "computer-storage",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "Cabinet",
          slug: "cabinet",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "CPU Cooler",
          slug: "cpu-cooler",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
        {
          name: "Power Supply",
          slug: "power-supply",
          mainCategoryId: "cmsfxrr8p000211po9z7q8we7",
        },
      ],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategory();
