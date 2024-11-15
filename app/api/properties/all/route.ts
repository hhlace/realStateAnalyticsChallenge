import { NextResponse } from "next/server";
import { PropertyService } from "@/app/services/PropertyService";
import { PropertyRepository } from "@/app/repositories/PropertyRepository";
import { connectToDatabase } from "@/app/lib/db";

const propertyService = new PropertyService(new PropertyRepository());

export async function GET() {
  try {
    await connectToDatabase();
    const properties = await propertyService.getAllProperties();
    return NextResponse.json(properties);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
