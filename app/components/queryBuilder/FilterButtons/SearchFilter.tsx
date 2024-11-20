"use client";

import { debounce } from "@/app/lib/utils";
import { useState, useCallback } from "react";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

export interface IAgent {
  name: string;
}

interface SearchFilterProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fetchAgents: (query: string) => Promise<IAgent[]>; // Fetch agents as an array of IAgent
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  value,
  onChange,
  fetchAgents,
}) => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<IAgent[]>([]);
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length >= 3) {
        setLoading(true); // Set loading to true before fetching
        try {
          const results = await fetchAgents(query);
          setAgents(results);
        } catch (error) {
          console.error("Error fetching agents:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setAgents([]);
      }
    }, 1000),
    [fetchAgents]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onChange(query); // Update parent state
    handleSearch(query); // Perform debounced search
  };

  const handleAgentSelect = (agent: IAgent) => {
    if (!selectedAgents.some((selected) => selected.name === agent.name)) {
      setSelectedAgents((prev) => [...prev, agent]);
    }
  };

  const handleAgentRemove = (agentName: string) => {
    setSelectedAgents((prev) =>
      prev.filter((agent) => agent.name !== agentName)
    );
  };

  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-semibold">{label}</legend>
      <input
        type="text"
        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        placeholder="Search for an agent..."
        value={value}
        onChange={handleInputChange}
      />
      {loading ? (
        <div className="flex justify-center items-center mt-2">
          <FaSpinner className="animate-spin text-gray-500" size={20} />
        </div>
      ) : (
        agents.length > 0 && (
          <select
            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm mt-2"
            onChange={(e) =>
              handleAgentSelect(
                agents.find((agent) => agent.name === e.target.value)!
              )
            }
          >
            <option value="">Select from {agents.length} agents</option>
            {agents.map((agent) => (
              <option key={agent.name} value={agent.name}>
                {agent.name}
              </option>
            ))}
          </select>
        )
      )}
      <div className="mt-4 space-y-2">
        {selectedAgents.map((agent) => (
          <div
            key={agent.name}
            className="flex items-center justify-between p-2 bg-gray-100 border rounded-md"
          >
            <span>{agent.name}</span>
            <button
              type="button"
              onClick={() => handleAgentRemove(agent.name)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default SearchFilter;
