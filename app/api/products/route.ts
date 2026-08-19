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
  const searchParams = req.nextUrl.searchParams;

  const cursor = searchParams.get("cursor") || undefined;
  const sort = searchParams.get("sort") || "latest";
  const search = searchParams.get("search") || undefined;

  const subcategory = searchParams.get("subcategory") || "";

  const reservedParams = new Set(["cursor", "sort", "search", "subcategory"]);

  const filters: Record<string, string[]> = {};
  for (const key of new Set(searchParams.keys())) {
    if (reservedParams.has(key)) continue;

    filters[key] = searchParams.getAll(key);
  }

  const products = await getProducts(
    subcategory,
    filters,
    sort,
    search,
    cursor,
  );

  return NextResponse.json({ products, hasMore: products.length === 5 });
}
