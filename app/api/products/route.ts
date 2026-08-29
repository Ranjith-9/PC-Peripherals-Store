import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/services/product";
import { rateLimiters } from "@/lib/rateLimiter";
import { redis } from "@/lib/redis";
import { getCached } from "@/lib/cache";

const CACHE_TTL_SECONDS = 60;

function buildCacheKey(params: {
  subcategory: string;
  sort: string;
  search?: string;
  cursor?: string;
  filters: Record<string, string[]>;
}) {
  const { subcategory, sort, search, cursor, filters } = params;

  // sort filter keys AND their array values so param order never changes the key
  const sortedFilters = Object.keys(filters)
    .sort()
    .map((k) => `${k}:${[...filters[k]].sort().join(",")}`)
    .join("|");

  return [
    "products",
    subcategory || "all",
    sort,
    search ?? "",
    cursor ?? "start",
    sortedFilters,
  ].join(":");
}

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  console.time("rate-limit");
  // Rate limiting
  const { success } = await rateLimiters.products.limit(ip);
  console.timeEnd("rate-limit");
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

  const cacheKey = buildCacheKey({
    subcategory,
    sort,
    search,
    cursor,
    filters,
  });
  console.time("cache");
  const products: any = await getCached(
    cacheKey,
    () => getProducts(subcategory, filters, sort, search, cursor),
    CACHE_TTL_SECONDS,
  );
  console.timeEnd("cache");
  // const products = await getProducts(
  //   subcategory,
  //   filters,
  //   sort,
  //   search,
  //   cursor,
  // );

  return NextResponse.json({ products, hasMore: products.length === 20 });
}
