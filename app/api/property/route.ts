import { NextResponse } from "next/server";
import { IProperty } from "../../interfaces/Property";
import { connectToDatabase } from "../../lib/db";
import { PropertyService } from "../../services/PropertyService";
import { PropertyRepository } from "../../repositories/PropertyRepository";

const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);

export async function GET(request: Request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 25;

    const properties: IProperty[] =
      await propertyService.getPaginatedProperties(limit, page);

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
