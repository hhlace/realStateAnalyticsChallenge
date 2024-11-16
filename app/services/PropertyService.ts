import { PropertyRepository } from "../repositories/PropertyRepository";

export class PropertyService {
  private propertyRepository: PropertyRepository;

  constructor(propertyRepository: PropertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async getPaginatedProperties(limit: number, page: number) {
    return await this.propertyRepository.getPaginatedProperties(limit, page);
  }

  async getAllFilters() {
    return await this.propertyRepository.getAllFilterOptions();
  }

  async getPropertyTypeData(maxPrice: number, minPrice: number) {
    const properties = await this.propertyRepository.getAggregatedProperties({
      filter: {
        "listing.price.price": { $gte: minPrice, $lte: maxPrice }, // Filter for price greater than or equal to 1,000,000
      },
      groupBy: "type",
      sort: { count: -1 },
    });

    return properties.map((item) => ({
      name: item.type || "Unknown",
      value: item.count,
    }));
  }

  async getAllProperties(limit: number = 10, page: number = 1) {
    const properties = await this.propertyRepository.getPaginatedProperties(
      limit,
      page
    );
    return properties;
  }

  async getAveragePrice(): Promise<number> {
    const properties = await this.propertyRepository.getAllProperties(100);
    const total = properties.reduce(
      (sum, property) => sum + property.listing.price.price,
      0
    );
    return properties.length ? total / properties.length : 0;
  }

  async getPropertiesByLocation(location: string) {
    return this.propertyRepository.getPropertiesByAgent(location);
  }

  // Additional analytics methods as needed
}
