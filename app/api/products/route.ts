import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/services/product";
import { rateLimiters } from "@/lib/rateLimiter";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Rate limiting
  const { success } = await rateLimiters.products.limit(ip);

  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

  const category = req.nextUrl.searchParams.getAll("category") || undefined;

  const sort = req.nextUrl.searchParams.get("sort") || "latest";

  const search = req.nextUrl.searchParams.get("search") || undefined;

  const products = await getProducts(cursor, category, sort, search);

  return NextResponse.json({ products, hasMore: products.length === 10 });
}
