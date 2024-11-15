import { connectToDatabase } from "../../../lib/db";
import { PropertyService } from "../../../services/PropertyService";
import { PropertyRepository } from "../../../repositories/PropertyRepository";
import { NextResponse } from "next/server";

const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);

export default async function GET(req: Request) {
  console.log("--> Fetching property type data!!");
  await connectToDatabase();

  if (req.method !== "GET") {
    // return res.status(405).json({ message: "Method Not Allowed" });
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const data = await propertyService.getPropertyTypeData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching property type data:", error);
    // res.status(500).json({ message: "Error fetching property type data" });
    return NextResponse.json(
      { error: "Failed to fetch property type data" },
      { status: 500 }
    );
  }
}
