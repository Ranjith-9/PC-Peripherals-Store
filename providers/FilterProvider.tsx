"use client";

import { createContext, useContext, useState, useEffect } from "react";
export interface Filtertype {
  sort: string;
  search: string;
  subcategory: string;
  filters: {
    [key: string]: string[];
  };
}

type FilterContextType = {
  filters: Filtertype;
  setFilters: React.Dispatch<React.SetStateAction<Filtertype>>;

  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filtertype>({
    sort: "latest",
    search: "",
    subcategory: "",
    filters: {},
  });

  const resetFilters = () => {
    setFilters({
      sort: "latest",
      search: "",
      subcategory: "",
      filters: {},
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useStore must be used within a FilterProvider");
  }
  return context;
}
