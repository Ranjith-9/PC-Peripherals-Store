"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/providers/StoreProvider";
import { useFilter } from "@/providers/FilterProvider";

interface categoriesProp {
  mainCategory: any;
  isAdmin?: boolean;
}

export default function CategoryBar({
  mainCategory,
  isAdmin = false,
}: categoriesProp) {
  const [hover, setHover] = useState<number | null>(null);
  const placeHolder = mainCategory;
  const router = useRouter();
  const { resetFilters } = useFilter();

  const handleCategoryClick = (slug: string) => {
    resetFilters();
    if (!isAdmin) {
      router.push(`/shop/${slug}`);
    } else {
      router.push(`/admin/updateproduct/${slug}`);
    }
  };

  return (
    <div className="w-full bg-neutral-800">
      <div className="ml-[18rem] relative flex text-white gap-20 h-12 text-[18px] font-bold font-mono">
        {placeHolder.map((cat: any, index: number) => (
          <div
            key={cat.name}
            className="flex items-center"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {cat.name}
            {hover == index && (
              <div className="absolute w-190 border bg-gray-200 shadow-lg z-1 left-0 top-12">
                {" "}
                {cat.subcategories.map((sub: any, subIndex: number) => (
                  <div
                    key={sub}
                    className="cursor-pointer text-black px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleCategoryClick(cat.slug[subIndex])}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
