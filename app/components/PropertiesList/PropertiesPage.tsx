import fetchProperties from "./fetchProperties";
import PropertyTable from "./PropertyTable";

const PropertiesPage: React.FC = async () => {
  const properties = await fetchProperties(987, 25); // Fetch initial properties

  return (
    <div>
      <h1>Properties</h1>
      <PropertyTable properties={properties} itemsPerPage={25} />
    </div>
  );
};

export default PropertiesPage;
