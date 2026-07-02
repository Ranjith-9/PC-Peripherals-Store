import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface RouteProps {
  params: Promise<{
    addressId: string;
  }>;
}

export async function DELETE(request: Request, { params }: RouteProps) {
  try {
    const { addressId } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const address = await db.address.findFirst({
      where: {
        id: addressId,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!address) {
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 },
      );
    }

    await db.address.delete({
      where: {
        id: address.id,
      },
    });

    return NextResponse.json({ message: "Address deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE_ADDRESS_ERROR:", error);

    return NextResponse.json(
      { message: "Could not delete address" },
      { status: 500 },
    );
  }
}
