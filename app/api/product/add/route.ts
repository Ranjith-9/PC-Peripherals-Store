import { NextRequest, NextResponse } from "next/server";
import { addProducts } from "@/services/product";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const result = await addProducts(data);

    if (!result) {
      console.error(result);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
