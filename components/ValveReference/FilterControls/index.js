// components/ValveReference/FilterControls/index.js
import React from 'react'
import ImplantFilter from './ImplantFilter'
import PositionFilter from './PositionFilter'
import TypeFilter from './TypeFilter'
import SizeFilter from './SizeFilter'

export default function FilterControls({
  position,
  implantMethod,
  type,
  size,
  searchTerm,
  onImplantMethodChange,
  onPositionChange,
  onTypeChange,
  onSizeChange,
  onSearchChange,
  availableData,
  disabled
}) {
  return (
    // Stack filters vertically on mobile, grid on larger screens
    <div className="space-y-4 p-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4 lg:gap-6 md:p-6 bg-gray-50 border-b border-gray-200">
      {/* Primary filters - full width on mobile, half width on medium screens */}
      <div className="md:col-span-1">
        <PositionFilter 
          value={position}
          onChange={onPositionChange}
          disabled={disabled}
        />
      </div>

      <div className="md:col-span-1">
        <ImplantFilter 
          value={implantMethod}
          onChange={onImplantMethodChange}
          disabled={disabled}
        />
      </div>
      
      {/* Secondary filters */}
      <div className="lg:col-span-1">
        <TypeFilter 
          value={type}
          onChange={onTypeChange}
          implantMethod={implantMethod}
          disabled={disabled}
        />
      </div>

      <div className="lg:col-span-1">
        <SizeFilter 
          value={size}
          onChange={onSizeChange}
          availableData={availableData}
          currentType={type}
          disabled={disabled}
        />
      </div>

      {/* Search - full width on mobile */}
      <div className="lg:col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Filter by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={disabled}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                   transition-colors duration-150
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  )
}