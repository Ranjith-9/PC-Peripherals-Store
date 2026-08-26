"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="w-full bg-[#3A3A3A]">
      <div className="ml-[18rem] relative flex text-white gap-20 h-12 text-[16px] font-mono uppercase tracking-widest">
        {placeHolder.map((cat: any, index: number) => (
          <div
            key={cat.name}
            className="flex items-center"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <span
              className={`hover:text-orange-300 ${hover === index ? "text-orange-300" : ""}`}
            >
              {cat.name}
            </span>
            {hover == index && (
              <div className="absolute w-190 border bg-gray-200 shadow-lg z-1 left-0 top-12">
                {" "}
                {cat.subcategories.map((sub: any, subIndex: number) => (
                  <div
                    key={sub}
                    className="group
                                relative
                                isolate
                                overflow-hidden
                                cursor-pointer
                                text-black
                                px-4
                                py-2"
                    onClick={() => handleCategoryClick(cat.slug[subIndex])}
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-0
                        -z-10
                        w-0
                        bg-orange-300
                        transition-[width]
                        duration-300
                        ease-out
                        group-hover:w-full
                      "
                    />
                    <span className="font-mono tracking-normal">{sub}</span>
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
