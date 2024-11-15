import PropertyTypesBarChart from "./components/charts/types/PropertyTypes/PropertyTipesBarChart";
import PropertiesPage from "./components/PropertiesList/PropertiesPage";
import PropertyTypeData from "./components/TypesChart/TypesChart";

export default function Home() {
  return (
    <div>
      <div className="w-full flex justify-center">
        <h1>Real State Analytics</h1>
        <PropertyTypesBarChart />
      </div>
      <div className="w-full h-96"></div>
      <PropertiesPage />
      <PropertyTypeData />
    </div>
  );
}
