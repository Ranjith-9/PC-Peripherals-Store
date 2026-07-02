import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addAddress } from "@/services/product";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const newAddress = await addAddress(session.user.id, {
      firstName: body.firstName,
      lastName: body.lastName,
      phone: body.phone,
      addressLine1: body.addressLine1,
      addressLine2: body.addressLine2,
      city: body.city,
      state: body.state,
      postalCode: body.postalCode,
      isDefault: body.isDefault,
    });

    return NextResponse.json(newAddress, { status: 201 });
  } catch (error) {
    console.error("CREATE_ADDRESS_ERROR:", error);

    return NextResponse.json(
      { message: "Could not create address" },
      { status: 500 },
    );
  }
}
