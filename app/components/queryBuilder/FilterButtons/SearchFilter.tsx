"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa"; // Import icons

interface SearchFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  value,
  onChange,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

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
        <div className="mt-2 relative p-4">
          <input
            type="text"
            id="Search"
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <FaSearch className="size-4" />
            </button>
          </span>
        </div>
      )}
    </fieldset>
  );
};

export default SearchFilter;
