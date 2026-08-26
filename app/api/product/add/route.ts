import { NextRequest, NextResponse } from "next/server";
import { addProducts } from "@/services/product";
import { rateLimiters } from "@/lib/rateLimiter";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: NextRequest) {
  // 1. Authentication
  const session = await requireAdmin();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Admin Access Required" },
      { status: 403 },
    );
  }

  // 2. Rate limiting
  const { success } = await rateLimiters.adminWrite.limit(session.user.id);

  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }
  try {
    const data = await req.json();

    const result = await addProducts(data);

    if (!result) {
      return NextResponse.json(result);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
