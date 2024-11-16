"use server";
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
  query: Record<string, string | string[]>
): Promise<any> => {
  try {
    const baseUrl = `${BASE_URL}/chart-data`; // Update with the correct API endpoint
    const params = new URLSearchParams();

    // Append query parameters to the URLSearchParams object
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array values (e.g., filters with multiple values)
        value.forEach((item) => params.append(key, item));
      } else if (value) {
        params.append(key, value.toString());
      }
    });

    // Build the full URL
    const url = `${baseUrl}?${params.toString()}`;
    console.log("Fetching chart data from:", url);

    // Perform the fetch
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Failed to fetch chart data: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
