import { IProperty } from "../interfaces/Property";
import { IFilters } from "../lib/utils";
import { PipelineStage } from "mongoose";
import Property, { PropertyDocument } from "../models/Property";

export class PropertyRepository {
  async getPaginatedProperties(limit: number, page: number) {
    const skip = (page - 1) * limit;
    return await Property.find().skip(skip).limit(limit).exec();
  }

  async getAggregatedProperties({
    filter = {},
    groupBy,
    sort,
  }: {
    filter?: Record<string, any>;
    groupBy: string;
    sort?: Record<string, 1 | -1>;
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
      { $sort: { count: -1 as 1 | -1 } },
    ]);
  }

  async getAgentsByQuery(query: string) {
    return await Property.aggregate([
      {
        $match: {
          $or: [
            { "agent.firstName": { $regex: query, $options: "i" } },
            { "agent.lastName": { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $group: {
          _id: { firstName: "$agent.firstName", lastName: "$agent.lastName" },
        },
      },
      {
        $project: {
          name: { $concat: ["$_id.firstName", " ", "$_id.lastName"] },
          _id: 0,
        },
      },
      { $sort: { name: 1 } },
    ]);
  }

  async getAggregatedData(
    filters: IFilters,
    groupBy: string,
    stats?: boolean
  ): Promise<
    Array<{
      name: string | null;
      count: number;
      avgPrice?: number;
      maxPrice?: number;
      minPrice?: number;
    }>
  > {
    // Transform filters into MongoDB-compatible format
    const transformedFilters: Record<string, unknown> = Object.entries(
      filters
    ).reduce((acc, [key, value]) => {
      if (key === "services" && Array.isArray(value) && value.length > 0) {
        acc[key] = { $elemMatch: { name: { $in: value } } };
      } else if (Array.isArray(value) && value.length > 0) {
        acc[key] = { $in: value };
      } else if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Define aggregation pipeline stages
    const matchStage: PipelineStage.Match = { $match: transformedFilters };

    const groupStage: PipelineStage.Group = {
      $group: {
        _id: `$${groupBy}`,
        count: { $sum: 1 },
        ...(stats && {
          avgPrice: { $avg: "$listing.price.price" },
          maxPrice: { $max: "$listing.price.price" },
          minPrice: { $min: "$listing.price.price" },
        }),
      },
    };

    const projectStage: PipelineStage.Project = {
      $project: {
        name: "$_id",
        count: 1,
        avgPrice: stats ? 1 : undefined,
        maxPrice: stats ? 1 : undefined,
        minPrice: stats ? 1 : undefined,
        _id: 0,
      },
    };

    const pipeline: PipelineStage[] = [
      matchStage,
      groupStage,
      projectStage,
      { $sort: { count: -1 as 1 | -1 } },
    ].filter((stage) => Object.keys(stage).length);

    return Property.aggregate(pipeline);
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
