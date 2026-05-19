import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/services/product";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

  const category = req.nextUrl.searchParams.getAll("category") || undefined;

  const sort = req.nextUrl.searchParams.get("sort") || "latest";

  const products = await getProducts(cursor, category, sort);

  return NextResponse.json({ products, hasMore: products.length === 10 });
}
