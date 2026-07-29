import { authOptions } from "@/lib/auth";
import { rateLimiters } from "@/lib/rateLimiter";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session)
      return NextResponse.json({ message: "session not found", status: 402 });

    const { success } = await rateLimiters.products.limit(session?.user.id);

    if (!success) {
      return NextResponse.json(
        { message: "Too many requests" },
        { status: 429 },
      );
    }

    await redis.set("hello", "world");
    const value = await redis.get("hello");
    console.log(value);
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
