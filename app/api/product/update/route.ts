import { NextRequest, NextResponse } from "next/server";
import { updateProduct } from "@/services/product";
import { rateLimiters } from "@/lib/rateLimiter";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: NextRequest) {
  // 1. Authentication
  const session = await requireAdmin();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  // 2. Rate limiting
  const { success } = await rateLimiters.adminWrite.limit(session.user.id);

  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }
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
