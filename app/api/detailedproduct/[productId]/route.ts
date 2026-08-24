import { getProductAndFiltersByIds } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  try {
    const { productId } = await params;
    const result = await getProductAndFiltersByIds(productId);
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
              (FC_item: any) =>
                FC_item.id === item.filterValue.filterCategoryId,
            )
            .map((item: any) => item.name),
          [item.filterValue.value, item.filterValue.id],
        ]),
      ),
    };
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "unable to get full product detail" },
      { status: 500 },
    );
  }
}
