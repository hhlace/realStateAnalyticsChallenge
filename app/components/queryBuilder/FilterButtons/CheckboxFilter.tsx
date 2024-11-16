"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons from react-icons

interface CheckboxFilterProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  options,
  selected,
  onChange,
  label,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const handleCheckboxChange = (option: string) => {
    const updatedSelection = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(updatedSelection);
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
        <div className="mt-2 space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-start gap-4 px-4"
            >
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                checked={selected.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default CheckboxFilter;
