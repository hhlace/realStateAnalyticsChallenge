import ChartComponent from "../components/queryBuilder/ChartComponent";
import { fetchFilters } from "../lib/fetch";

const DataChart = async () => {
  const filterOptions = await fetchFilters();

  return (
    <div className="p-4 h-full">
      <ChartComponent filterOptions={filterOptions} />
    </div>
  );
};

export default DataChart;
