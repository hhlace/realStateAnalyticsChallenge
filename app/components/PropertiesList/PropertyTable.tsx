import { IProperty } from "@/app/interfaces/Property";

interface PropertyTableProps {
  properties: IProperty[];
  itemsPerPage: number;
}

const PropertyTable: React.FC<PropertyTableProps> = ({
  properties,
  itemsPerPage,
}) => {
  // Render the properties
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property._id}>
            <td>{property.referenceCode}</td>
            <td>{property.listing.title}</td>
            {/* <td>{property.location}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyTable;
