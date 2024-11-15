"use server";

import { BASE_URL } from "@/app/lib/constants";

export const fetchPropertyTypeData = async (
  maxPrice: number,
  minPrice: number
) => {
  const response = await fetch(
    `${BASE_URL}/propertyData?maxPrice=${maxPrice}&minPrice=${minPrice}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch property type data");
  }
  const data = await response.json();
  return data;
};
