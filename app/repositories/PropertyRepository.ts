import { IProperty } from "../interfaces/Property";
import Property, { PropertyDocument } from "../models/Property";

export class PropertyRepository {
  async getPaginatedProperties(limit: number, page: number) {
    const skip = (page - 1) * limit;
    return await Property.find().skip(skip).limit(limit).exec();
  }

  async getAggregatedProperties({
    filter = {}, // default to an empty object for no filtering
    groupBy,
    sort,
  }: {
    filter?: Record<string, any>; // Allows multiple key-value pairs for filtering
    groupBy: string;
    sort?: Record<string, 1 | -1>; // Sorting can be ascending (1) or descending (-1)
  }) {
    const pipeline: any[] = [];

    // Apply filtering if any filters are provided
    if (Object.keys(filter).length > 0) {
      pipeline.push({ $match: filter });
    }

    // Grouping stage based on the provided 'groupBy' field
    pipeline.push({
      $group: {
        _id: `$${groupBy}`,
        count: { $sum: 1 },
        avgPrice: { $avg: "$listing.price.price" },
        maxPrice: { $max: "$listing.price.price" },
        minPrice: { $min: "$listing.price.price" },
      },
    });

    // Project stage to rename _id field and retain relevant fields
    pipeline.push({
      $project: {
        type: "$_id",
        count: 1,
        avgPrice: 1,
        maxPrice: 1,
        minPrice: 1,
        _id: 0,
      },
    });

    // Sorting stage if sorting criteria is provided
    if (sort) {
      pipeline.push({ $sort: sort });
    }

    // Execute the aggregation pipeline
    return await Property.aggregate(pipeline);
  }

  async getPropertyTypeAggregation() {
    return await Property.aggregate([
      {
        $group: {
          _id: "$type", // Group by property type
          count: { $sum: 1 }, // Count each property type
          avgPrice: { $avg: "$listing.price.price" },
          maxPrice: { $max: "$listing.price.price" },
          minPrice: { $min: "$listing.price.price" },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          avgPrice: 1,
          maxPrice: 1,
          minPrice: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  async getAllFilterOptions() {
    const types = await Property.distinct("type");

    const services = await Property.aggregate([
      { $unwind: "$services" },
      {
        $group: {
          _id: "$services.name", // Group by service name
          id: { $first: "$services.id" }, // Get the `id` for sorting
        },
      },
      {
        $project: {
          serviceName: "$_id", // Include the service name
          id: 1, // Include the id for sorting purposes
          _id: 0,
        },
      },

      { $sort: { id: 1 } },
    ]).then((results) => results.map((result) => result.serviceName));

    return {
      types: types.filter(Boolean),
      services: services.filter(Boolean),
    };
  }

  async getAllProperties(limit: number): Promise<IProperty[]> {
    const properties = await Property.find().limit(limit).exec();

    return properties;
  }

  async getPropertiesByAgent(agentName: string): Promise<PropertyDocument[]> {
    return Property.find({ "agent.firstName": agentName }).exec();
  }

  async getPropertiesWithPriceGreaterThan(
    minPrice: number
  ): Promise<PropertyDocument[]> {
    return Property.find({ "listing.price.price": { $gt: minPrice } }).exec();
  }
}
