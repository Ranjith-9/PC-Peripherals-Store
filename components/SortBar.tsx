export default function SortBar({ filters, setFilters }: any) {
  return (
    <div>
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
