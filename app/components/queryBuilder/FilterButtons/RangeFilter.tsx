"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (key: "min" | "max", value: string) => {
    const updatedRange = { ...range, [key]: value };
    onChange(updatedRange);
    // Clear error message as the user edits the input
    setErrorMessage(null);
  };

  const validateRange = () => {
    const min = parseFloat(range.min);
    const max = parseFloat(range.max);

    if (min && max && min > max) {
      setErrorMessage("Max must be highrer than min");
    } else {
      setErrorMessage(null);
    }
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
        <div className="mt-2">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Min:</span>
              <input
                type="number"
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                placeholder="Min"
                value={range.min}
                onChange={(e) => handleInputChange("min", e.target.value)}
                onBlur={validateRange} // Validate on blur
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
                onBlur={validateRange} // Validate on blur
              />
            </label>
          </div>
          {errorMessage && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p> // Display error message
          )}
        </div>
      )}
    </fieldset>
  );
};

export default RangeFilter;
