"use client";

import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import CheckboxFilter from "./CheckboxFilter";
import RangeFilter from "./RangeFilter";
import SearchFilter from "./SearchFilter";
import { fetchAgents } from "@/app/lib/fetch";
import { FiltersSummary } from "./FiltersSummary";

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

    const clearFilter = (key: string) => {
      handleFilterChange(
        key,
        key === "price" || key === "meters" ? { min: "", max: "" } : []
      );
    };

    useImperativeHandle(ref, () => ({
      resetFilters,
    }));

    return (
      <div className="space-y-4">
        <FiltersSummary filters={filters} onClear={clearFilter} />

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
          label="Agent (soon)"
          value={filters.agent}
          onChange={(value) => handleFilterChange("agent", value)}
          fetchAgents={fetchAgents}
        />
      </div>
    );
  }
);

FilterButtons.displayName = "FilterButtons";

export default FilterButtons;
