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
