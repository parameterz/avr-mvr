// components/ValveReference/FilterControls/SizeFilter.js
import React from 'react'

export default function SizeFilter({ value, onChange, availableData, currentType }) {
  const getAvailableSizes = () => {
    let filteredData = availableData;
    if (currentType !== 'all') {
      filteredData = availableData.filter(valve => 
        valve.type === currentType || valve.deployment === currentType
      );
    }
    const sizes = [...new Set(filteredData.map(valve => valve.size))]
      .sort((a, b) => parseInt(a) - parseInt(b));
    return sizes;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Size (mm)
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
      >
        <option value="all">All Sizes</option>
        {getAvailableSizes().map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
    </div>
  )
}