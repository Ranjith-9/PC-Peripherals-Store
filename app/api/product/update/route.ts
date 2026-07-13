import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "@/services/product";

export async function POST(req: NextRequest) {
  try {
    const { data, id } = await req.json();

    const result = await updateProduct(id, data);

    if (!result) {
      console.error(result);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
