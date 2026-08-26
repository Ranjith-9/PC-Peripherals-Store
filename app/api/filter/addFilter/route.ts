import { NextRequest, NextResponse } from "next/server";
import {
  checkKeyInFC,
  addFilterCategory,
  addFilterValue,
  linkPFV,
  checkFilterValue,
} from "@/services/filter";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const session = await requireAdmin();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { key, value, subCatId, productId } = await req.json();

    const isKey = await checkKeyInFC(key, subCatId); // returns existing item or false

    if (!isKey) {
      const fc_id = await addFilterCategory(key, subCatId);
      const fv_id = await addFilterValue(fc_id, value);
      const pfv_status = await linkPFV(fv_id, productId);

      if (!pfv_status) {
        return NextResponse.json(
          { message: "unable to link product id and filter value 1 " },
          { status: 500 },
        );
      }
    } else {
      const existing_id = isKey.id;

      const isValue = await checkFilterValue(existing_id, value);
      if (!isValue) {
        const fv_id = await addFilterValue(existing_id, value);
        const pfv_status = await linkPFV(fv_id, productId);
        if (!pfv_status) {
          return NextResponse.json(
            { message: "unable to link product id and filter value 2" },
            { status: 500 },
          );
        }
      } else {
        const existing_v_id = isValue.id;
        console.log(existing_v_id);
        const pfv_status = await linkPFV(existing_v_id, productId);
        if (!pfv_status) {
          return NextResponse.json(
            { message: "unable to link product id and filter value 3 " },
            { status: 500 },
          );
        }
      }
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("ADD FILTER ERROR:", error);

    return NextResponse.json(
      { message: "Unable to add filter" },
      { status: 500 },
    );
  }
}
