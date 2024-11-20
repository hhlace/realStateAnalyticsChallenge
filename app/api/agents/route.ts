// app/api/agents/route.ts
import { PropertyRepository } from "@/app/repositories/PropertyRepository";
import { PropertyService } from "@/app/services/PropertyService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search") || "";

    if (!query || query.length < 3) {
      return NextResponse.json(
        { error: "Search query must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const propertyRepository = new PropertyRepository();
    const propertyService = new PropertyService(propertyRepository);
    const agents = await propertyService.searchAgents(query);

    return NextResponse.json(agents);
  } catch (error) {
    console.error("Error processing agents request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
