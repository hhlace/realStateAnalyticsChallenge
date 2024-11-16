import { Suspense } from "react";
import PieChartComponent from "../../core/PieChart";
import { fetchPropertyTypeData } from "./fetchPropertyTypeData";
import ChartSkeleton from "../../core/ChartSkeleton";

const PropertyTypesBarChart: React.FC = async () => {
  const maxPrice = 100000;
  const minPrice = 80000;
  const data = await fetchPropertyTypeData(maxPrice, minPrice);

  return (
    <>
      <Suspense fallback={<ChartSkeleton />}>
        <PieChartComponent data={data} />
      </Suspense>
    </>
  );
};

export default PropertyTypesBarChart;
