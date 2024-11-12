// components/ValveReference/FilterControls/SizeFilter.js
import React from 'react'

export default function SizeFilter({ value, onChange, availableData, currentType, disabled }) {
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
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Size (mm)
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 
                   bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-colors duration-150
                   disabled:bg-gray-100 disabled:cursor-not-allowed
                   appearance-none"
      >
        <option value="all">All Sizes</option>
        {getAvailableSizes().map(size => (
          <option key={size} value={size.toString()}>
            {size} mm
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6">
        <svg className="h-4 w-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  )
}