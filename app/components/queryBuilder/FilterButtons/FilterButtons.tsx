"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import CheckboxFilter from "./CheckboxFilter";
import RangeFilter from "./RangeFilter";
import SearchFilter from "./SearchFilter";

interface FilterButtonsProps {
  filterOptions: {
    types: string[];
    services: string[];
  };
  onFilterChange: (filters: {
    types: string[];
    services: string[];
    price: { min: string; max: string };
    meters: { min: string; max: string };
    agent: string;
  }) => void;
}

const FilterButtons = forwardRef(
  ({ filterOptions, onFilterChange }: FilterButtonsProps, ref) => {
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

    const resetFilters = () => {
      const resetState = {
        types: [],
        services: [],
        price: { min: "", max: "" },
        meters: { min: "", max: "" },
        agent: "",
      };
      setFilters(resetState);
    };

    useImperativeHandle(ref, () => ({
      resetFilters,
    }));

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
  }
);

FilterButtons.displayName = "FilterButtons";

export default FilterButtons;
