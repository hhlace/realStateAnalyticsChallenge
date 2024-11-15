import { connectToDatabase } from "@/app/lib/db";
import { PropertyRepository } from "@/app/repositories/PropertyRepository";
import { PropertyService } from "@/app/services/PropertyService";
import { NextResponse } from "next/server";

const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);

export async function GET(req: Request) {
  //get maxPrice and minPrice from query params
  const { searchParams } = new URL(req.url);
  const maxPrice = Number(searchParams.get("maxPrice"));
  const minPrice = Number(searchParams.get("minPrice"));
  await connectToDatabase();

  try {
    const data = await propertyService.getPropertyTypeData(maxPrice, minPrice);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching property type data:", error);
    return NextResponse.json(
      { error: "Failed to fetch property type data" },
      { status: 500 }
    );
  }
}
