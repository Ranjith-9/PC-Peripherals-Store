"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Filtertype } from "@/types/filter";

export default function SideBar({ categories, filters, setFilters }: any) {
  const options = [
    {
      title: "Categories",
      options: categories,
    },
  ];

  const [openSection, setOpenSection]: any = useState({});
  const [selectedOptions, setSelectedOptions]: any = useState({});

  return (
    <div className="w-full p-6 space-y-8 text-black">
      {options.map((section) => (
        <div key={section.title}>
          <div className="w-full flex items-center justify-between py-2">
            {/* Left Side */}
            <span className="font-semibold text-lg">{section.title}</span>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setFilters((prev: Filtertype) => ({
                    ...prev,
                    category: [],
                  }));
                }}
                className="text-sm text-gray-500 hover:text-black"
              >
                Clear
              </button>

              <button
                onClick={() =>
                  setOpenSection((prev: any) => ({
                    ...prev,
                    [section.title]: !prev[section.title],
                  }))
                }
              >
                <ChevronDown
                  className={`
          transition-transform duration-300
          ${openSection[section.title] ? "rotate-180" : ""}
        `}
                />
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${openSection[section.title] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {section.options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category.includes(option)}
                  onChange={() => {
                    setFilters((prev: Filtertype) => {
                      const current = prev.category;

                      const updated = current.includes(option)
                        ? current.filter((item) => item !== option)
                        : [...current, option];

                      return {
                        ...prev,
                        category: updated,
                      };
                    });
                  }}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
