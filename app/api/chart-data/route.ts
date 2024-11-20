import { NextResponse } from "next/server";
import { ChartService } from "@/app/services/ChartService";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const chartService = new ChartService();
    const data = await chartService.getChartData(searchParams);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing chart data request:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Unknown error on get chart-data" },
        { status: 500 }
      );
    }
  }
}
