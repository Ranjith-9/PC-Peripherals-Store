import { NextResponse } from "next/server";
import { getOrders } from "@/services/order";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { rateLimiters } from "@/lib/rateLimiter";

export async function GET() {
  // 1. Authentication
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2. Rate limiting
  const { success } = await rateLimiters.userRead.limit(session.user.id);

  if (!success) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }
  try {
    const response = await getOrders();
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
