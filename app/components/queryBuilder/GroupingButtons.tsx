import React from "react";

interface GroupingButtonsProps {
  groupBy: string;
  setGroupBy: (value: string) => void;
}

const GroupingButtons: React.FC<GroupingButtonsProps> = ({
  groupBy,
  setGroupBy,
}) => {
  const options = [
    { label: "Type", value: "type" },
    { label: "Agent", value: "agent" },
  ];

  return (
    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setGroupBy(option.value)}
          className={`inline-block px-4 py-2 text-sm font-medium ${
            groupBy === option.value
              ? "text-white bg-blue-600 hover:bg-blue-500"
              : "text-gray-700 hover:bg-gray-50"
          } focus:relative`}
        >
          {option.label}
        </button>
      ))}
    </span>
  );
};

export default GroupingButtons;
