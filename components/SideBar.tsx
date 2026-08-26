"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFilter } from "@/providers/FilterProvider";
export interface FilterOption {
  name: string;
  values: string[];
}

interface SideBarProps {
  categoryFilters: FilterOption[];
}

export default function SideBar({ categoryFilters }: SideBarProps) {
  const { filters, setFilters } = useFilter();

  const [openSection, setOpenSection] = useState<Record<string, boolean>>({});

  /*
   * Open / close a filter section
   */
  const toggleSection = (name: string) => {
    setOpenSection((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  /*
   * Check whether a filter option is selected
   */
  const isSelected = (filterName: string, value: string) => {
    return filters.filters[filterName]?.includes(value) ?? false;
  };

  /*
   * Select / unselect a filter option
   */
  const toggleFilter = (filterName: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev.filters[filterName] ?? [];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        filters: {
          ...prev.filters,
          [filterName]: updatedValues,
        },
      };
    });
  };

  /*
   * Clear all selections for one filter
   */
  const clearFilter = (filterName: string) => {
    setFilters((prev) => {
      const updatedfilters = {
        ...prev.filters,
      };

      delete updatedfilters[filterName];

      return {
        ...prev,
        filters: updatedfilters,
      };
    });
  };

  /*
   * Number of selected options in a filter
   */
  const selectedCount = (filterName: string) => {
    return filters.filters[filterName]?.length ?? 0;
  };

  return (
    <aside className="w-full text-black font-mono uppercase p-4 ">
      {categoryFilters &&
        categoryFilters.map((section) => {
          const isOpen = openSection[section.name] ?? false;
          const count = selectedCount(section.name);

          return (
            <div key={section.name} className="border-b border-gray-200 py-4">
              {/* ================= HEADER ================= */}

              <div className="flex items-center justify-between">
                {/* Filter name + selected count */}

                <div className="flex items-center gap-2">
                  <span className="font-bold text-[13px]">{section.name}</span>

                  {count > 0 && (
                    <span className="text-xs text-black">({count})</span>
                  )}
                </div>

                {/* Right side */}

                <div className="flex items-center gap-3">
                  {count > 0 && (
                    <button
                      type="button"
                      onClick={() => clearFilter(section.name)}
                      className="text-sm text-black hover:text-black"
                    >
                      Clear
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleSection(section.name)}
                    aria-label={`Toggle ${section.name}`}
                  >
                    <ChevronDown
                      size={18}
                      className={`
                      transition-transform duration-300 easein
                      ${isOpen ? "rotate-180 bg-orange-300" : ""}
                    `}
                    />
                  </button>
                </div>
              </div>

              {/* ================= OPTIONS ================= */}

              <div
                className={`
                grid transition-all duration-300
                ${
                  isOpen
                    ? "mt-3 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
              `}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2">
                    {section.values.map((value) => {
                      const checked = isSelected(section.name, value);

                      return (
                        <label
                          key={value}
                          className="flex cursor-pointer items-center gap-2 text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleFilter(section.name, value)}
                            className="h-4 w-4 cursor-pointer"
                          />

                          <span className="text-xs">{value}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </aside>
  );
}
