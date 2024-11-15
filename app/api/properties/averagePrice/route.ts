import { PropertyRepository } from "@/app/repositories/PropertyRepository";
import { PropertyService } from "@/app/services/PropertyService";
import { NextResponse } from "next/server";

const propertyService = new PropertyService(new PropertyRepository());

export async function GET() {
  try {
    const averagePrice = await propertyService.getAveragePrice();
    return NextResponse.json({ averagePrice });
  } catch {
    return NextResponse.json(
      { error: "Failed to calculate average price" },
      { status: 500 }
    );
  }
}
