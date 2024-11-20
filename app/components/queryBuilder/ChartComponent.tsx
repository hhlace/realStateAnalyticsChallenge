"use client";
import { useState, useRef, useEffect } from "react";
import FilterButtons from "./FilterButtons/FilterButtons";
import PieChartComponent from "../charts/core/PieChart";
import { fetchChartData } from "@/app/lib/fetch";
import BarChartComponent from "../charts/core/BarChart";
import { FaSpinner } from "react-icons/fa";

interface QueryBuilderProps {
  filterOptions: {
    types: string[];
    services: string[];
  };
}

interface ChartDataType {
  pieChartData: any[];
  barChartData: any[];
}

const ChartComponent: React.FC<QueryBuilderProps> = ({ filterOptions }) => {
  const [filters, setFilters] = useState<Record<string, any>>({
    types: [],
    services: [],
    price: { min: "", max: "" },
    meters: { min: "", max: "" },
    agent: "",
  });
  const [selectedTab, setSelectedTab] = useState<string>("pie");
  const [chartData, setChartData] = useState<ChartDataType>({
    pieChartData: [],
    barChartData: [],
  });
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const filterButtonsRef = useRef<{ resetFilters: () => void } | null>(null);

  const handleFilterChange = (updatedFilters: Record<string, any>) => {
    setFilters(updatedFilters);
  };

  const handleApplyFilters = async () => {
    const query = {
      types: filters.types?.length ? filters.types : undefined,
      services: filters.services?.length ? filters.services : undefined,
      price:
        filters.price?.min || filters.price?.max ? filters.price : undefined,
      meters:
        filters.meters?.min || filters.meters?.max ? filters.meters : undefined,
      agent: filters.agent || undefined,
    };

    setLoading(true);
    try {
      const chartData = await fetchChartData(query);
      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    filterButtonsRef.current?.resetFilters();
    setFilters({
      types: [],
      services: [],
      price: { min: "", max: "" },
      meters: { min: "", max: "" },
      agent: "",
    });
    handleApplyFilters(); // Fetch data with cleared filters
  };

  useEffect(() => {
    handleApplyFilters();
  }, []);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Filters Section */}
      <div className="border border-neutral-400 p-6 rounded w-96 h-full overflow-y-auto">
        <h2 className="mb-2">Filters</h2>
        <div className="flex justify-end mb-4 gap-2">
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
        <FilterButtons
          ref={filterButtonsRef}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
        />
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

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-indigo-600">
              <FaSpinner className="animate-spin text-gray-500" size={20} />
            </span>
          </div>
        ) : (
          <>
            {/* Render the selected chart */}
            {selectedTab === "pie" && chartData && (
              <PieChartComponent data={chartData.pieChartData} />
            )}
            {selectedTab === "bar" && (
              <BarChartComponent data={chartData.barChartData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
