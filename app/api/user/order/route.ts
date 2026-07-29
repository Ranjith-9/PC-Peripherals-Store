import { NextResponse, NextRequest } from "next/server";
import { getUserOrders } from "@/services/order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;
    if (!userId)
      return NextResponse.json(
        {
          message: "user id not found",
        },
        { status: 500 },
      );
    const response = await getUserOrders(userId);
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
