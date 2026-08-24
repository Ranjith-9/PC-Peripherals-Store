import { NextRequest, NextResponse } from "next/server";
import { checkProductStock } from "@/services/product";
import { IncreaseItemZod } from "@/zodSchema/order";
import { rateLimiters } from "@/lib/rateLimiter";

// need to authenticate the user before allowed to make changes to the stock

export async function PATCH(req: NextRequest) {
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

  // 3. Parse body once
  const body = await req.json();

  // 4. Validate
  const result = IncreaseItemZod.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten() },
      { status: 400 },
    );
  }

  const { productId, currentQuantity } = result.data;

  // 5. General logic
  try {
    const stock = await checkProductStock(productId);

    if (stock === null) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (stock <= currentQuantity) {
      return NextResponse.json(
        { error: "Not enough stock available" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
