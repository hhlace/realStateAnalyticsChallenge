import { FaChevronDown } from "react-icons/fa6";

interface SortingButtonsProps {
  sort: string;
  setSort: (value: string) => void;
}

const SortingButtons: React.FC<SortingButtonsProps> = ({ sort, setSort }) => (
  <div className="space-y-2">
    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
        <span className="text-sm font-medium"> Sort </span>
        <span className="transition group-open:-rotate-180">
          <FaChevronDown />
        </span>
      </summary>

      <ul className="space-y-1 border-t border-gray-200 p-4">
        <li>
          <button
            onClick={() => setSort("asc")}
            className={`block w-full text-left p-2 text-sm ${
              sort === "asc" ? "bg-gray-200 font-medium" : "text-gray-700"
            }`}
          >
            Ascending
          </button>
        </li>
        <li>
          <button
            onClick={() => setSort("desc")}
            className={`block w-full text-left p-2 text-sm ${
              sort === "desc" ? "bg-gray-200 font-medium" : "text-gray-700"
            }`}
          >
            Descending
          </button>
        </li>
      </ul>
    </details>
  </div>
);

export default SortingButtons;
