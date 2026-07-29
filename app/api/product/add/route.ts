import { NextRequest, NextResponse } from "next/server";
import { addProducts } from "@/services/product";
import { rateLimiters } from "@/lib/rateLimiter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // 1. Authentication
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
