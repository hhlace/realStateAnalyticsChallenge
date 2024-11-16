import QueryBuilder from "../components/queryBuilder/QueryBuilder";
import { fetchFilters } from "../lib/fetch";

const DataChart = async () => {
  const filterOptions = await fetchFilters();
  debugger;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Query Builder</h1>
      {/* Pass the fetched filter options as a prop */}
      <QueryBuilder filterOptions={filterOptions} />
    </div>
  );
};

export default DataChart;
