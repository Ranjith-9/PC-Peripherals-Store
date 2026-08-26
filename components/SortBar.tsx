import { useFilter } from "@/providers/FilterProvider";

export default function SortBar() {
  const { filters, setFilters } = useFilter();

  return (
    <div className="flex items-center gap-2 text-black">
      <span className="text-xs font-normal tracking-wide text-[#9B9A94]">
        SORT
      </span>

      <div className="relative">
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="
          font-bold border-b border-[#14171A]
          appearance-none
          bg-transparent
          border-0
          pr-5
          pb-0.5
          text-xs
          uppercase
          outline-none
          cursor-pointer
        "
        >
          <option value="latest">Latest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
