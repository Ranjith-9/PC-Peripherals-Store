import { useStore } from "@/providers/StoreProvider";
import type { Filtertype } from "@/types/filter";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const { filters, setFilters } = useStore();

  const [searchInput, setSearchInput] = useState<string>(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev: Filtertype) => ({
        ...prev,
        search: searchInput,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setFilters]);

  return (
    <div>
      <input
        type="text"
        placeholder="search for product"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
}
