"use client";
import { useEffect, useState } from "react";

interface categoriesProp {
  categories: string[];
}

export default function CategoryBar({ categories }: categoriesProp) {
  const placeHolder = {
    categories: [
      "Gaming",
      "Streaming",
      "Components",
      "PC Builds",
      "Monitors",
      "Custom PC quotes",
      "Our Stores",
    ],
  };

  const subCat = new Map<string, string[]>([
    ["Gaming", ["Mouse", "Keyboard", "Pads"]],
    ["Streaming", ["MIC", "Camera"]],
    ["Components", ["GPU", "Motherboard", "CPU"]],
    ["PC Builds", ["Gaming PCs", "Video Editing PCs", "Streaming PCs"]],
  ]);

  const cat = subCat.entries();
  return (
    <div>
      <div className="flex text-black gap-5">
        {[...cat].map((item: any) => (
          <div key={item}>
            {item[0]}
            {item[1].map((item) => {
              return <div key={item}> {item} </div>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
