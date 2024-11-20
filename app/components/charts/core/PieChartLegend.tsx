import { formatUnits } from "@/app/lib/utils";

interface LegendProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  totalValue?: number;
}

const PieChartLegend: React.FC<LegendProps> = ({
  data,
  colors,
  totalValue,
}) => {
  return (
    <ul className="space-y-2">
      {data.map((entry, index) => (
        <li key={entry.name} className="flex items-center">
          <span
            className="block w-4 h-4 rounded-full "
            style={{ backgroundColor: colors[index % colors.length] }}
          ></span>
          <span className="ml-2 font-medium text-sm">{entry.name}</span>
          <span className="ml-auto text-gray-600 text-xs">
            {((entry.value / (totalValue || 1)) * 100).toFixed(1)}% (
            {formatUnits(entry.value)})
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PieChartLegend;
