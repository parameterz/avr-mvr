// components/ValveReference/index.js
'use client'

import React, { useState } from 'react'
import { valveData, IMPLANT_METHODS, VALVE_POSITIONS } from '@/data'
import FilterControls from './FilterControls'
import ResultsTable from './ResultsTable'

export default function ValveReference() {
  // State management for all filters
  const [implantMethod, setImplantMethod] = useState(IMPLANT_METHODS[0])
  const [position, setPosition] = useState(VALVE_POSITIONS[0])
  const [type, setType] = useState("all")
  const [size, setSize] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Get current dataset based on implant method and position
  const currentData = valveData[implantMethod]?.[position] || []

  // Filter the data based on all criteria
  const filteredData = currentData.filter(valve => {
    if (type !== "all" && valve.type !== type) return false;
    if (size !== "all" && valve.size !== size) return false;
    if (searchTerm && !valve.valve.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Reset size when implant method or position changes
  const handleImplantMethodChange = (newMethod) => {
    setImplantMethod(newMethod);
    setSize("all");
    setType("all");
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
    setSize("all");
    setType("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Prosthetic Valve Reference
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Reference values for prosthetic heart valves
            </p>
          </div>

          {/* Filter Controls */}
          <FilterControls
            implantMethod={implantMethod}
            position={position}
            type={type}
            size={size}
            searchTerm={searchTerm}
            onImplantMethodChange={handleImplantMethodChange}
            onPositionChange={handlePositionChange}
            onTypeChange={setType}
            onSizeChange={setSize}
            onSearchChange={setSearchTerm}
            availableData={currentData}
          />

          {/* Results Table */}
          <ResultsTable
            data={filteredData}
            implantMethod={implantMethod}
            position={position}
          />
        </div>
      </div>
    </div>
  );
}