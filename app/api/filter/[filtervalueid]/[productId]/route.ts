import { NextRequest, NextResponse } from "next/server";
import { unlinkPFV } from "@/services/filter";
import { requireAdmin } from "@/lib/admin";
interface RouteProps {
  params: Promise<{
    filtervalueid: string;
    productId: string;
  }>;
}

export async function DELETE(request: NextRequest, { params }: RouteProps) {
  try {
    const session = await requireAdmin();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { filtervalueid, productId } = await params;
    console.log("filter value", filtervalueid);
    console.log("productid", productId);

    const response = await unlinkPFV(filtervalueid, productId);

    if (!response) {
      return NextResponse.json(
        { message: "response: uable to delete the relationship " },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "successfully deleted the relationship" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "uable to delete the relationship" },
      { status: 500 },
    );
  }
}
