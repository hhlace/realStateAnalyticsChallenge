import PropertyTypesBarChart from "./components/charts/types/PropertyTypes/PropertyTipesBarChart";
import PropertiesPage from "./components/PropertiesList/PropertiesPage";
// import QueryBuilder from "./components/queryBuilder/QueryBuilder";
import PropertyTypeData from "./components/TypesChart/TypesChart";
import DataChart from "./data-chart/page";

export default function Home() {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-center">
          <h1>Real State Analytics</h1>
        </div>
        {/* <QueryBuilder /> */}
        <DataChart />

        {/* <PropertyTypesBarChart /> */}
      </div>
      <div className="w-full h-96"></div>
      {/* <PropertiesPage /> */}
      {/* <PropertyTypeData /> */}
    </div>
  );
}
