import { NextRequest, NextResponse } from "next/server";
import { getProductByIds } from "@/services/product";

export async function POST(req: NextRequest) {
  const { ids } = await req.json();

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
