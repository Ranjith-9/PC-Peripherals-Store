"use client";
import { useEffect, useState } from "react";

interface categoriesProp {
  categories: string[];
}

export default function CategoryBar({ categories }: categoriesProp) {
  const [hover, setHover] = useState<number | null>(null);
  const placeHolder = [
    {
      name: "Gaming",
      subcategories: ["Mouse", "Keyboard", "Headset"],
    },
    {
      name: "Components",
      subcategories: ["GPU", "CPU", "TPU"],
    },
    {
      name: "Streaming",
      subcategories: ["Microphone", "Camera", "Capture Card"],
    },
    {
      name: "PC builds",
      subcategories: ["Budget", "Comp", "Maxxed out"],
    },
    {
      name: "Monitors",
      subcategories: ["144", "240", "360"],
    },
    {
      name: "Custom",
      subcategories: ["Giga ATX", "Mini ATX", "ATX"],
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="ml-[18rem] relative flex text-black gap-20 h-12 text-[18px] font-bold font-mono">
        {placeHolder.map((cat, index) => (
          <div
            key={cat.name}
            className="flex items-center"
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {cat.name}
            {hover == index && (
              <div className="absolute w-190 border bg-gray-300 shadow-lg z-1 left-0 top-12">
                {" "}
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {" "}
                    {sub}{" "}
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
