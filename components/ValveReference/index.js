'use client'

import React, { useState } from 'react'
import { valveData } from '@/data'
import FilterControls from './FilterControls'
import ResultsTable from './ResultsTable'

export default function ValveReference() {
  const [implantMethod, setImplantMethod] = useState("Surgical")
  const [position, setPosition] = useState("Aortic")
  const [type, setType] = useState("all")
  const [size, setSize] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const currentData = valveData[implantMethod]?.[position] || []

  const handleDataChange = async (callback) => {
    setIsLoading(true)
    try {
      await callback()
    } finally {
      setTimeout(() => setIsLoading(false), 300)
    }
  }

  const handleImplantMethodChange = (newMethod) => {
    handleDataChange(() => {
      setImplantMethod(newMethod)
      setSize("all")
      setType("all")
    })
  }

  const handlePositionChange = (newPosition) => {
    handleDataChange(() => {
      setPosition(newPosition)
      setSize("all")
      setType("all")
    })
  }

  const filteredData = currentData.filter(valve => {
    if (type !== "all") {
      if (implantMethod === "Surgical") {
        if (valve.type !== type) return false
      } else {
        if (valve.deployment !== type) return false
      }
    }
    if (size !== "all" && valve.size !== size) return false
    if (searchTerm && !valve.valve.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white touch-pan-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 safe-bottom">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header with subtle animation */}
          <div className="px-6 py-4 border-b border-gray-200 animate-fade-in">
            <h1 className="text-xl font-semibold text-gray-900">
              Prosthetic Valve Reference
            </h1>
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

          {/* Controls with loading state */}
          <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : ''}`}>
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

          {/* Results with loading state */}
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
          <div className="px-6 py-3 border-t text-sm text-gray-500 animate-fade-in">
            Showing {filteredData.length} results
          </div>
        </div>
      </div>
    </div>
  )
}