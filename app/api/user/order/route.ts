import { NextResponse, NextRequest } from "next/server";
import { getUserOrders } from "@/services/order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rateLimiters } from "@/lib/rateLimiter";

export async function GET(req: NextRequest) {
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
    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json(
        {
          message: "user id not found",
        },
        { status: 500 },
      );
    const response = await getUserOrders(userId);
    console.log("response from db for api/user call", response);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
