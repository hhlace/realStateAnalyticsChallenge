import { fetchPropertyTypeData } from "../charts/types/PropertyTypes/fetchPropertyTypeData";

interface PropertyTypeData {
  type: string;
  count: number;
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
}

const PropertyTypeData: React.FC = async () => {
  const data = await fetchPropertyTypeData();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div>
      <h2>Property Type Data</h2>
      <ul>
        {data &&
          data.map((item, index) => (
            <li key={index}>
              <strong>Type:</strong> {item.type} | <strong>Count:</strong>{" "}
              {item.count} | <strong>Average Price:</strong>{" "}
              {formatPrice(item.avgPrice)} | <strong>Price Range:</strong>{" "}
              {item.maxPrice && formatPrice(item.maxPrice)}
              {" - "}
              {item.minPrice && formatPrice(item.minPrice)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PropertyTypeData;
