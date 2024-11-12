// components/ValveReference/index.js
'use client'

import React, { useState } from 'react'
import { valveData } from '@/data'
import FilterControls from './FilterControls'
import ResultsTable from './ResultsTable'

export default function ValveReference() {
  // State for main filters
  const [implantMethod, setImplantMethod] = useState("Surgical")
  const [position, setPosition] = useState("Aortic")
  const [type, setType] = useState("all")
  const [size, setSize] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // State for loading indicators
  const [isLoading, setIsLoading] = useState(false)
  const [loadingType, setLoadingType] = useState(null) // 'data' or 'filter'

  // Get current dataset based on implant method and position
  const currentData = valveData[implantMethod]?.[position] || []

  // Handler for implant method changes
  const handleImplantMethodChange = async (newMethod) => {
    setLoadingType('data');
    setIsLoading(true);
    try {
      setImplantMethod(newMethod);
      // Reset filters when changing major categories
      setSize("all");
      setType("all");
    } finally {
      // Add slight delay for loading state visibility
      setTimeout(() => {
        setIsLoading(false);
        setLoadingType(null);
      }, 500);
    }
  };

  // Handler for position changes
  const handlePositionChange = async (newPosition) => {
    setLoadingType('data');
    setIsLoading(true);
    try {
      setPosition(newPosition);
      // Reset filters when changing major categories
      setSize("all");
      setType("all");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoadingType(null);
      }, 500);
    }
  };

  // Filter the data based on all criteria
  const filteredData = currentData.filter(valve => {
    // Handle type/deployment based on implant method
    if (type !== "all") {
      if (implantMethod === "Surgical") {
        if (valve.type !== type) return false;
      } else {
        if (valve.deployment !== type) return false;
      }
    }
    // Filter by size
    if (size !== "all" && valve.size !== size) return false;
    // Filter by search term
    if (searchTerm && !valve.valve.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Prosthetic Heart Valve Reference Data
            </h1>
            // in components/ValveReference/index.js

<p className="mt-1 text-sm text-gray-500">
  Doppler reference values for prosthetic heart valves, based on the{' '}
  <a 
    href="https://onlinejase.com/article/S0894-7317(23)00533-3/fulltext" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:bg-blue-50 px-1 rounded transition-all duration-150"
  >
    January 2024 JASE Guidelines.
  </a>
</p>          </div>

          {/* Filter Controls - with loading state */}
          <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
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
              disabled={isLoading}
            />
          </div>

          {/* Results section with loading states */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            <ResultsTable
              data={filteredData}
              implantMethod={implantMethod}
              position={position}
            />
          </div>

          {/* Results count */}
          <div className="px-6 py-3 border-t text-sm text-gray-500">
            Showing {filteredData.length} results
          </div>
        </div>
      </div>
    </div>
  );
}