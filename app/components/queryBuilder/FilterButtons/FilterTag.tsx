export const FilterTag: React.FC<{
  label: string;
  value: string;
  onClear: () => void;
}> = ({ label, value, onClear }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
      <span>
        <strong>{label}:</strong> {value}
      </span>
      <button
        onClick={onClear}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};
