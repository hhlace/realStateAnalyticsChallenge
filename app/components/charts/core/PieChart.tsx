// components/PieChartComponent.tsx
"use client";

import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import PieChartLegend from "./PieChartLegend";

interface PieChartComponentProps {
  data: Array<{ name: string; value: number }>;
  dataKey?: string;
  innerRadius?: number;
  outerRadius?: number;
  colors?: string[];
  width?: number | string;
  height?: number | string;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  dataKey = "value",
  innerRadius = 50,
  outerRadius = 80,
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57", "#a4de6c"],
  width = "100%",
  height = 400,
}) => {
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex">
      <ResponsiveContainer width={width} height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <PieChartLegend data={data} colors={colors} totalValue={totalValue} />
    </div>
  );
};

export default PieChartComponent;
