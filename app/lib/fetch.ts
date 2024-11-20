"use server";

import { IAgent } from "../components/queryBuilder/FilterButtons/SearchFilter";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchFilters = async () => {
  try {
    const response = await fetch(`${BASE_URL}/filters`);
    if (!response.ok) {
      throw new Error(`Failed to fetch filters: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching filters:", error);
    throw error;
  }
};

export const fetchChartData = async (
  query: Record<string, string | string[] | { min?: number; max?: number }>
): Promise<any> => {
  try {
    const chartDataUrl = `${BASE_URL}/chart-data`;
    const params = new URLSearchParams();

    // Append query parameters to the URLSearchParams object
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Serialize arrays into a single comma-separated string
        params.append(key, value.join(","));
      } else if (typeof value === "object" && value !== null) {
        // Serialize range objects (e.g., price, meters) as min-max strings
        if (value.min !== undefined || value.max !== undefined) {
          params.append(key, `${value.min || ""}-${value.max || ""}`);
        }
      } else if (value) {
        params.append(key, value.toString());
      }
    });

    // Build the full URL
    const url = `${chartDataUrl}?${params.toString()}`;
    console.log("Fetching chart data from:", url);

    // Perform the fetch
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch chart data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const fetchAgents = async (query: string): Promise<IAgent[]> => {
  const response = await fetch(`${BASE_URL}/agents?search=${query}`);
  if (!response.ok) {
    console.error("Failed to fetch agents");
    return [];
  }
  return response.json();
};
