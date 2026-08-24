import { NextRequest, NextResponse } from "next/server";
import { checkProducts } from "@/services/product";
import { rateLimiters } from "@/lib/rateLimiter";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { success } = await rateLimiters.products.limit(ip);

  if (!success) {
    return Response.json(
      { message: "Too many payment attempts" },
      { status: 429 },
    );
  }

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
