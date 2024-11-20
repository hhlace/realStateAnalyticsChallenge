import { constructFilters } from "../lib/utils";
import { PropertyRepository } from "../repositories/PropertyRepository";

export class ChartService {
  private propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  async getChartData(searchParams: URLSearchParams) {
    const filters = constructFilters(searchParams);

    const pieChartRawData = await this.propertyRepository.getAggregatedData(
      filters,
      "type", // Grouping for pie chart
      false // No statistics for pie chart
    );

    const barChartRawData = await this.propertyRepository.getAggregatedData(
      filters,
      "type", // Grouping for bar chart
      true // Include statistics for bar chart
    );

    const pieChartData = this.preparePieChartData(pieChartRawData);
    const barChartData = this.prepareBarChartData(barChartRawData);

    return { pieChartData, barChartData };
  }

  private preparePieChartData(
    rawData: any[]
  ): { name: string; value: number }[] {
    return rawData.map((item) => ({
      name: item.name || "Unknown",
      value: item.count,
    }));
  }

  private prepareBarChartData(
    rawData: any[]
  ): { name: string; avgPrice: number; maxPrice: number; minPrice: number }[] {
    return rawData.map((item) => ({
      name: item.name || "Unknown",
      avgPrice: parseFloat(item.avgPrice.toFixed(0)) || 0,
      maxPrice: item.maxPrice || 0,
      minPrice: item.minPrice || 0,
    }));
  }
}
