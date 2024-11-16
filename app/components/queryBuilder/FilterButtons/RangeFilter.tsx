"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons for dropdown

interface RangeFilterProps {
  label: string;
  range: { min: string; max: string };
  onChange: (range: { min: string; max: string }) => void;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
  label,
  range,
  onChange,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const handleInputChange = (key: "min" | "max", value: string) => {
    const updatedRange = { ...range, [key]: value };
    onChange(updatedRange);
  };

  return (
    <fieldset className="space-y-2">
      <button
        className="flex justify-between items-center w-full px-4 py-2 text-lg font-semibold text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
        onClick={() => setOpenOptions(!openOptions)}
      >
        {label}
        {openOptions ? (
          <FaChevronUp className="ml-2 text-gray-500" />
        ) : (
          <FaChevronDown className="ml-2 text-gray-500" />
        )}
      </button>
      {openOptions && (
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Min:</span>
            <input
              type="number"
              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              placeholder="Min"
              value={range.min}
              onChange={(e) => handleInputChange("min", e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Max:</span>
            <input
              type="number"
              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              placeholder="Max"
              value={range.max}
              onChange={(e) => handleInputChange("max", e.target.value)}
            />
          </label>
        </div>
      )}
    </fieldset>
  );
};

export default RangeFilter;
