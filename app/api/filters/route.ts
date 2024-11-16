import { connectToDatabase } from "@/app/lib/db";
import { PropertyService } from "@/app/services/PropertyService";
import { PropertyRepository } from "@/app/repositories/PropertyRepository";
import { NextResponse } from "next/server";

const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);

export async function GET(req: Request) {
  await connectToDatabase();

  try {
    const filters = await propertyService.getAllFilters();
    return NextResponse.json(filters);
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Failed to fetch filters" },
      { status: 500 }
    );
  }
}
