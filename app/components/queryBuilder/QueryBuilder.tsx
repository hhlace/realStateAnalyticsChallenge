"use client";
import React, { useState } from "react";
import GroupingButtons from "./GroupingButtons";
// import FilterButtons from "./FilterButtons";
import SortingButtons from "./SortingButtons";
import FilteringButtons from "./FilterButtons/FilterButtons";

interface QueryBuilderProps {
  filterOptions: {
    types: string[];
    services: string[];
  };
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ filterOptions }) => {
  // const [groupBy, setGroupBy] = useState<string>("type");
  // const [sort, setSort] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (updatedFilters: Record<string, any>) => {
    setFilters(updatedFilters);
    console.log("Updated Filters:", updatedFilters);
    // Make API calls or trigger state updates based on new filters
  };

  // const handleQueryUpdate = () => {
  //   const query = `/api/properties?groupBy=${groupBy}&minPrice=${
  //     filters.minPrice || ""
  //   }&maxPrice=${filters.maxPrice || ""}&sort=${sort}`;
  //   console.log("Generated Query:", query);
  // };

  return (
    <div>
      <div className="w-96">
        {/* <GroupingButtons
          groupBy={groupBy}
          setGroupBy={(value) => {
            setGroupBy(value);
            handleQueryUpdate();
          }}
        /> */}
        <FilteringButtons
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />
        {/* <SortingButtons
          sort={sort}
          setSort={(value) => {
            setSort(value);
            handleQueryUpdate();
          }}
        /> */}
      </div>
    </div>
  );
};

export default QueryBuilder;
