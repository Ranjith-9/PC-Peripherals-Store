import { NextRequest, NextResponse } from "next/server";
import { checkProducts } from "@/services/product";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const productIds = data.cartItems.map((item: any) => item.productId);

    const products = await checkProducts(productIds);

    if (!products) {
      return NextResponse.json(
        { error: "couldn't fetch products" },
        { status: 400 },
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(error);
  }
}
