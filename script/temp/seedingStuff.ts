import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedCategory() {
  try {
    await prisma.productFilterValue.createMany({
      data: [
        {
          productId: "cmsg0ya4z00007q8gl1794zar",
          filterValueId: "cmsg0r6rx0001x74qvr1jhmed",
        },
        {
          productId: "cmsg0ya4z00007q8gl1794zar",
          filterValueId: "cmsg0r6rx0003x74qmoyu0ne5",
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
