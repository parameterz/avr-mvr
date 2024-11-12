// components/ValveReference/FilterControls/index.js
import React from 'react'
import ImplantFilter from './ImplantFilter'
import PositionFilter from './PositionFilter'
import TypeFilter from './TypeFilter'
import SizeFilter from './SizeFilter'

export default function FilterControls({
  implantMethod,
  position,
  type,
  size,
  searchTerm,
  onImplantMethodChange,
  onPositionChange,
  onTypeChange,
  onSizeChange,
  onSearchChange,
  availableData
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 bg-gray-50 border-b border-gray-200">
      <ImplantFilter 
        value={implantMethod}
        onChange={onImplantMethodChange}
      />
      
      <PositionFilter 
        value={position}
        onChange={onPositionChange}
      />

      <TypeFilter 
        value={type}
        onChange={onTypeChange}
        implantMethod={implantMethod}
      />

      <SizeFilter 
        value={size}
        onChange={onSizeChange}
        availableData={availableData}
        currentType={type}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search (Optional)
        </label>
        <input
          type="text"
          placeholder="Filter by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
        />
      </div>
    </div>
  )
}