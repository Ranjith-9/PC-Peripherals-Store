import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedCategory() {
  try {
    await prisma.mainCategory.createMany({
      data: [
        { name: "Gaming", slug: "gaming" },
        { name: "Streaming", slug: "streaming" },
        { name: "Components", slug: "components" },
        { name: "PC Builds", slug: "pc-builds" },
        { name: "Monitors", slug: "monitors" },
      ],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategory();

// done , will not be used in future
