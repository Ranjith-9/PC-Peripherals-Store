import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const sub = await db.subCategory.findUnique({
    where: {
      slug: "mouse",
    },
  });

  if (!sub) {
    return NextResponse.json({ error: "Not found" });
  }

  const filterCategoryTimes: number[] = [];
  const filterValueTimes: number[] = [];

  for (let i = 0; i < 5; i++) {
    let start = performance.now();

    const filterCategories = await db.filterCategory.findMany({
      where: {
        subCategoryId: sub.id,
      },
    });

    const categoryTime = performance.now() - start;
    filterCategoryTimes.push(categoryTime);

    console.log(`filterCategories ${i + 1}: ${categoryTime.toFixed(2)}ms`);

    start = performance.now();

    await db.filterValue.findMany({
      where: {
        filterCategoryId: {
          in: filterCategories.map((fc) => fc.id),
        },
      },
    });

    const valueTime = performance.now() - start;
    filterValueTimes.push(valueTime);

    console.log(`filterValues ${i + 1}: ${valueTime.toFixed(2)}ms`);
  }

  console.log("filterCategories:", filterCategoryTimes);
  console.log("filterValues:", filterValueTimes);

  return NextResponse.json({
    filterCategories: filterCategoryTimes,
    filterValues: filterValueTimes,
  });
}
