import slugify from "slugify";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  console.log(products.length);

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

    console.log(`Updated ${product.name}`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
