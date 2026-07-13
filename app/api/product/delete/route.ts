import { NextRequest, NextResponse } from "next/server";
import { deleteProduct } from "@/services/product";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    console.log("id from delete request", id);

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 },
      );
    }

    await deleteProduct(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
