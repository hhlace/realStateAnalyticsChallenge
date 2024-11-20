"use client";
import { formatLargeNumbers, formatNumber } from "@/app/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface BarChartComponentProps {
  data: Array<{
    name: string;
    avgPrice: number;
    maxPrice: number;
    minPrice: number;
  }>;
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          tickFormatter={formatLargeNumbers}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={formatLargeNumbers}
          tick={{ fontSize: 12 }}
        />
        <Tooltip formatter={(value) => formatNumber(Number(value))} />
        <Legend
          formatter={(value) => {
            if (value === "avgPrice") return "Average Price (right axis)";
            if (value === "maxPrice") return "Maximum Price";
            if (value === "minPrice") return "Minimum Price (right axis)";
            return value;
          }}
        />
        <Bar yAxisId="left" dataKey="maxPrice" fill="#82ca9d" />
        <Bar yAxisId="right" dataKey="minPrice" fill="#ffc658" />
        <Bar yAxisId="right" dataKey="avgPrice" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
