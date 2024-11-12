// components/ValveReference.js
'use client'

import React, { useState } from 'react'
import { mitralValveData } from '@/data/mitralValveData'
import { aorticValveData } from '@/data/aorticValveData'

// Helper function to calculate statistical ranges (±2 SD)
const calculateRange = (value) => {
  if (!value) return null;
  const parts = value.split('±').map(x => parseFloat(x.trim()));
  if (parts.length !== 2) return null;
  
  return {
    low: (parts[0] - 2 * parts[1]).toFixed(1),
    high: (parts[0] + 2 * parts[1]).toFixed(1)
  };
};

// Component for displaying a single valve's data
const ValveDataRow = ({ valve }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const ranges = {
    peakGradient: calculateRange(valve.peakGradient),
    meanGradient: calculateRange(valve.meanGradient),
    eoa: calculateRange(valve.eoa)
  };

  return (
    <>
      <tr 
        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4 border-b font-medium text-gray-900">{valve.valve}</td>
        <td className="px-6 py-4 border-b text-center">{valve.size}</td>
        <td className="px-6 py-4 border-b text-right">
          {valve.peakGradient || 
            <span className="text-gray-400 italic">data not available</span>}
        </td>
        <td className="px-6 py-4 border-b text-right">
          {valve.meanGradient || 
            <span className="text-gray-400 italic">data not available</span>}
        </td>
        <td className="px-6 py-4 border-b text-right">
          {valve.eoa || 
            <span className="text-gray-400 italic">data not available</span>}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan="5" className="px-6 py-4 border-b">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900">
                Statistical Ranges (95% of values fall within ±2 SD)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ranges.peakGradient && (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">Peak Gradient Range</p>
                    <p className="font-medium text-lg">
                      {ranges.peakGradient.low} - {ranges.peakGradient.high} mmHg
                    </p>
                  </div>
                )}
                {ranges.meanGradient && (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">Mean Gradient Range</p>
                    <p className="font-medium text-lg">
                      {ranges.meanGradient.low} - {ranges.meanGradient.high} mmHg
                    </p>
                  </div>
                )}
                {ranges.eoa && (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-sm text-gray-600 mb-1">EOA Range</p>
                    <p className="font-medium text-lg">
                      {ranges.eoa.low} - {ranges.eoa.high} cm²
                    </p>
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default function ValveReference() {
  const [position, setPosition] = useState("Aortic")
  const [type, setType] = useState("all")      
  const [size, setSize] = useState("all")      
  const [searchTerm, setSearchTerm] = useState("")

  const valveData = position === "Aortic" ? aorticValveData : mitralValveData

  // Get available sizes based on current position and type
  const getAvailableSizes = () => {
    let availableValves = valveData;
    if (type !== 'all') {
      availableValves = availableValves.filter(valve => valve.type === type);
    }
    const sizes = [...new Set(availableValves.map(valve => valve.size))]
      .sort((a, b) => parseInt(a) - parseInt(b));
    return sizes;
  };
    // Handle position change
    const handlePositionChange = (e) => {
      setPosition(e.target.value);
      setSize("all"); // Reset size when position changes
    };
  
    // Handle type change
    const handleTypeChange = (e) => {
      setType(e.target.value);
      setSize("all"); // Reset size when type changes
    };
  
    // Filter valves
    const filteredValves = valveData.filter(valve => {
      if (type !== "all" && valve.type !== type) return false;
      if (size !== "all" && valve.size !== size) return false;
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
                Prosthetic Valve Reference
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Reference values for prosthetic heart valves
              </p>
            </div>
  
            {/* Search Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 border-b border-gray-200">
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <select
                  value={position}
                  onChange={handlePositionChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="Aortic">Aortic</option>
                  <option value="Mitral">Mitral</option>
                </select>
              </div>
  
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={handleTypeChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="all">All Types</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Tissue">Tissue</option>
                </select>
              </div>
  
              {/* Dynamic Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size (mm)
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                >
                  <option value="all">All Sizes</option>
                  {getAvailableSizes().map(s => (
                    <option key={s} value={s.toString()}>{s}</option>
                  ))}
                </select>
              </div>
  
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                />
              </div>
            </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Valve
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Size (mm)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Peak Gradient (mmHg)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Mean Gradient (mmHg)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    EOA (cm²)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredValves.length > 0 ? (
                  filteredValves.map((valve, index) => (
                    <ValveDataRow key={index} valve={valve} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No matching valves found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}