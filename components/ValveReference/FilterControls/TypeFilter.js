// components/ValveReference/FilterControls/TypeFilter.js
import React from 'react'

export default function TypeFilter({ value, onChange, implantMethod }) {
  const getTypeOptions = () => {
    if (implantMethod === "Surgical") {
      return [
        { value: "all", label: "All Types" },
        { value: "Mechanical", label: "Mechanical" },
        { value: "Tissue", label: "Tissue" }
      ];
    } else {
      return [
        { value: "all", label: "All Types" },
        { value: "balloon-expandable", label: "Balloon-Expandable" },
        { value: "self-expanding", label: "Self-Expanding" }
      ];
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Type
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
      >
        {getTypeOptions().map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}