import QueryBuilder from "../components/queryBuilder/QueryBuilder";
import { fetchFilters } from "../lib/fetch";

const DataChart = async () => {
  const filterOptions = await fetchFilters();

  return (
    <div className="p-4">
      {/* Pass the fetched filter options as a prop */}
      <QueryBuilder filterOptions={filterOptions} />
    </div>
  );
};

export default DataChart;
