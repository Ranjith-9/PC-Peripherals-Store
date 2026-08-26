import { db } from "@/lib/db";
import { getProducts } from "@/services/product";
import UpdateProducts from "@/components/UpdateProducts";

export default async function category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const product = await getProducts(category, {});
  const filter_response = await db.subCategory.findUnique({
    where: {
      slug: category,
    },
    include: {
      filterCategories: {
        include: {
          values: true,
        },
      },
    },
  });

  const filters = filter_response?.filterCategories.map((category: any) => ({
    name: category.name,
    values: category.values.map((value: any) => value.value),
  }));

  return (
    <div>
      <UpdateProducts
        mainCategory={category}
        categoryFilters={filters}
        initialProducts={product}
      />
    </div>
  );
}
