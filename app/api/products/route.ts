import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/services/product";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
  const products = await getProducts(cursor);

  return NextResponse.json({ products, hasMore: products.length === 10 });
}
