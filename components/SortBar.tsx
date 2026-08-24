import { useFilter } from "@/providers/FilterProvider";

export default function SortBar() {
  const { filters, setFilters } = useFilter();

  return (
    <div className="text-black flex justify-end ">
      <span className="text-sm font-medium">Sort by: </span>

      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        className=""
      >
        <option value="latest">Latest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
