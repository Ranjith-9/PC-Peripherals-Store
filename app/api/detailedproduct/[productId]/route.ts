import { getProductAndFiltersByIds } from "@/services/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    console.log("PRODUCT ID:", productId);

    const result = await getProductAndFiltersByIds(productId);

    console.log("DATABASE RESULT:", result);

    if (!result) {
      return NextResponse.json(
        {
          message: "Product not found",
          productId,
        },
        { status: 404 },
      );
    }

    const product = {
      id: result.id,
      name: result.name,
      description: result.description,
      price: result.price,
      imageUrl: result.imageUrl,
      stock: result.stock,
      subcategoryId: result.subCategoryId,
      attributes: result.attributes,

      filters: Object.fromEntries(
        result.filterValues.map((item: any) => {
          const filterCategory = result.subCategory.filterCategories.find(
            (FC_item: any) => FC_item.id === item.filterValue.filterCategoryId,
          );

          return [
            filterCategory?.name,
            [item.filterValue.value, item.filterValue.id],
          ];
        }),
      ),
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error("🔥 DETAILED PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "unable to get full product detail" },
      { status: 500 },
    );
  }
}
