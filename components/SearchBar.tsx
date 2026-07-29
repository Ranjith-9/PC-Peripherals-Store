import { useStore } from "@/providers/StoreProvider";
import type { Filtertype } from "@/types/filter";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

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
    <div className="w-full max-w-md">
      <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
        <Search className="mr-2 h-5 w-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search for products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
