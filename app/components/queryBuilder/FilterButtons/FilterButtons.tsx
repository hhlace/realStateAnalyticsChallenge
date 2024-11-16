"use client";

import React, { useState, useEffect } from "react";
import CheckboxFilter from "./CheckboxFilter";
import RangeFilter from "./RangeFilter";
import SearchFilter from "./SearchFilter";

interface FilterButtonsProps {
  filterOptions: {
    types: string[];
    services: string[];
  };
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterOptions,
  onFilterChange,
}) => {
  const [filters, setFilters] = useState({
    types: [],
    services: [],
    price: { min: "", max: "" },
    meters: { min: "", max: "" },
    agent: "",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <CheckboxFilter
        label="Types"
        options={filterOptions.types}
        selected={filters.types}
        onChange={(value) => handleFilterChange("types", value)}
      />
      <CheckboxFilter
        label="Services"
        options={filterOptions.services}
        selected={filters.services}
        onChange={(value) => handleFilterChange("services", value)}
      />
      <RangeFilter
        label="Price"
        range={filters.price}
        onChange={(value) => handleFilterChange("price", value)}
      />
      <RangeFilter
        label="Meters"
        range={filters.meters}
        onChange={(value) => handleFilterChange("meters", value)}
      />
      <SearchFilter
        label="Agent"
        value={filters.agent}
        onChange={(value) => handleFilterChange("agent", value)}
      />
    </div>
  );
};

export default FilterButtons;
