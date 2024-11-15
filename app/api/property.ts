import { NextApiRequest, NextApiResponse } from "next";
import { IProperty } from "../interfaces/Property";
import { connectToDatabase } from "../lib/db";
import { PropertyService } from "../services/PropertyService";
import { PropertyRepository } from "../repositories/PropertyRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1, limit = 25 } = req.query;

  await connectToDatabase();

  const propertyRepository = new PropertyRepository();

  const propertyService = new PropertyService(propertyRepository);

  try {
    const properties: IProperty[] =
      await propertyService.getPaginatedProperties(Number(page), Number(limit));
    res.status(200).json(properties);
  } catch {
    res.status(500).json({ message: "Error fetching properties" });
  }
}
