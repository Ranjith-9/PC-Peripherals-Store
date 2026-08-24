import { db } from "@/lib/db";
import slugify from "slugify";

async function main() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  for (const product of products) {
    const slug = slugify(product.name, {
      lower: true,
      strict: true,
    });

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        slug,
      },
    });

    console.log(`${product.name} -> ${slug}`);
  }
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
