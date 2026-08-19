// app/api/test-product/route.ts
import { getProductAndFiltersByIds } from "@/services/product";

export async function GET() {
  const result = await getProductAndFiltersByIds("cmshgcwnl001dfl4g079ndv32");

  const product = {
    id: result.id,
    name: result.name,
    description: result.description,
    price: result.price,
    imageUrl: result.imageUrl,
    stock: result.stock,
    subcategoryId: result.subCategoryId,
    attribute: result.attributes,
    filters: Object.fromEntries(
      result.filterValues.map((item: any) => [
        result.subCategory.filterCategories
          .filter(
            (FC_item: any) => FC_item.id === item.filterValue.filterCategoryId,
          )
          .map((item: any) => item.name),
        [item.filterValue.value, item.filterValue.id],
      ]),
    ),
  };

  return Response.json(result);
}
