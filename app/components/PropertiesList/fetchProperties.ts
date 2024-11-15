"use server";
import { IProperty } from "@/app/interfaces/Property";
import { BASE_URL } from "@/app/lib/constants";

const fetchProperties = async (
  page: number,
  limit: number
): Promise<IProperty[]> => {
  const response = await fetch(
    `${BASE_URL}/property?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching properties: ${response?.statusText}`);
  }

  const data = await response.json();
  return data;
};

export default fetchProperties;
