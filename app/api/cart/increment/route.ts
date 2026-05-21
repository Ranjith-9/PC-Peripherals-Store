import { NextRequest, NextResponse } from "next/server";
import { checkProductStock } from "@/services/product";

export async function PATCH(req: Request) {
  const { productId, currentQuantity } = await req.json();
  if (!productId) {
    return new Response(JSON.stringify({ error: "Product ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const res = await checkProductStock(productId);
    console.log("result from the backend", res);
    console.log("res from backend", res);
    if (res === null) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else if (res <= currentQuantity) {
      return new Response(
        JSON.stringify({ error: "Not enough stock available" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to increment cart item", error);
    return new Response(JSON.stringify({ error: "Failed to increment item" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
