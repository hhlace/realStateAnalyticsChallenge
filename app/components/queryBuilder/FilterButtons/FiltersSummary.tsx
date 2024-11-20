import { FilterTag } from "./FilterTag";

export const FiltersSummary: React.FC<{
  filters: {
    types: string[];
    services: string[];
    price: { min: number; max: number };
    meters: { min: number; max: number };
    agent: string;
  };
  onClear: (label: string) => void; // Use "onClear" instead of "clearFilter"
}> = ({ filters, onClear }) => {
  return (
    <div className="mb-4 space-y-2">
      <h3 className="text-lg font-semibold">Applied Filters:</h3>
      <div className="flex flex-wrap gap-2">
        {/* Display each filter dynamically */}
        {filters.types.length > 0 && (
          <FilterTag
            label="Types"
            value={filters.types.join(", ")}
            onClear={() => onClear("types")}
          />
        )}
        {filters.services.length > 0 && (
          <FilterTag
            label="Services"
            value={filters.services.join(", ")}
            onClear={() => onClear("services")}
          />
        )}
        {(filters.price.min || filters.price.max) && (
          <FilterTag
            label="Price"
            value={`${filters.price.min || "Min"} - ${
              filters.price.max || "Max"
            }`}
            onClear={() => onClear("price")}
          />
        )}
        {(filters.meters.min || filters.meters.max) && (
          <FilterTag
            label="Meters"
            value={`${filters.meters.min || "Min"} - ${
              filters.meters.max || "Max"
            }`}
            onClear={() => onClear("meters")}
          />
        )}
        {filters.agent && (
          <FilterTag
            label="Agent"
            value={filters.agent}
            onClear={() => onClear("agent")}
          />
        )}
      </div>
    </div>
  );
};
