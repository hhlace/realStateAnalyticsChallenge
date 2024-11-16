"use client";
import React, { useState, useRef } from "react";
import FilterButtons from "./FilterButtons/FilterButtons";
import PieChartComponent from "../charts/core/PieChart";
import { fetchChartData } from "@/app/lib/fetch";
// import PieChartComponent from "../components/charts/core/PieChartComponent";
// import BarChartComponent from "../components/charts/core/BarChartComponent";

interface QueryBuilderProps {
  filterOptions: {
    types: string[];
    services: string[];
  };
}

const QueryBuilder: React.FC<QueryBuilderProps> = ({ filterOptions }) => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedTab, setSelectedTab] = useState<string>("pie");
  const [chartData, setChartData] = useState<any[]>([]);
  const filterButtonsRef = useRef<{ resetFilters: () => void } | null>(null);

  const handleFilterChange = (updatedFilters: Record<string, any>) => {
    setFilters(updatedFilters);
    console.log("Updated Filters:", updatedFilters);
  };

  const handleApplyFilters = async () => {
    const query = {
      types: filters.types.length ? filters.types : undefined,
      services: filters.services.length ? filters.services : undefined,
      price: filters.price.min || filters.price.max ? filters.price : undefined,
      meters:
        filters.meters.min || filters.meters.max ? filters.meters : undefined,
      agent: filters.agent || undefined,
    };

    console.log("Query Object:", query);

    try {
      const chartData = await fetchChartData(query);
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const handleReset = () => {
    filterButtonsRef.current?.resetFilters(); // Reset the filters in the child component
    setFilters({}); // Reset the local state
  };

  return (
    <div className="flex">
      {/* Query Builder */}
      <div className="border border-neutral-400 p-6 rounded w-96">
        <h2 className="mb-4">Filters</h2>
        <FilterButtons
          ref={filterButtonsRef}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />
        <div className="flex justify-end mt-8 gap-2">
          <button
            onClick={handleReset}
            className="inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring active:bg-indigo-500"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring active:text-indigo-500"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="border border-neutral-400 p-6 rounded flex-1 ml-4">
        <h2 className="mb-4">Chart</h2>

        {/* Tabs for Chart Selection */}
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              selectedTab === "pie"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setSelectedTab("pie")}
          >
            Type Pie
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              selectedTab === "bar"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600"
            }`}
            onClick={() => setSelectedTab("bar")}
          >
            Bar Stats
          </button>
        </div>

        {/* Render the selected chart */}
        {selectedTab === "pie" && <PieChartComponent data={[]} />}
        {selectedTab === "bar" && <div>bar</div>}
      </div>
    </div>
  );
};

export default QueryBuilder;
