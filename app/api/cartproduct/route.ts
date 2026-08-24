import { NextRequest, NextResponse } from "next/server";
import { getProductByIds } from "@/services/product";
import { CartProductsSchema } from "@/zodSchema/product";
import { z } from "zod";
import { rateLimiters } from "@/lib/rateLimiter";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // Rate limiting
  const { success } = await rateLimiters.products.limit(ip);

  if (!success) {
    return Response.json(
      { message: "Too many payment attempts" },
      { status: 429 },
    );
  }

  const result = CartProductsSchema.safeParse(await req.json());

  if (!result.success) {
    console.log("error being produced");
    return Response.json(
      { errors: z.treeifyError(result.error) },
      { status: 400 },
    );
  }

  const { ids } = result.data;

  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  try {
    const products = await getProductByIds(ids);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to fetch products by ID", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
