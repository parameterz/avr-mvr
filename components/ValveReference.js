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
        className="hover:bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-4 py-3 border font-medium">{valve.valve}</td>
        <td className="px-4 py-3 border text-center">{valve.size}</td>
        <td className="px-4 py-3 border text-right">
          {valve.peakGradient || 
            <span className="text-gray-400 italic">Not available</span>}
        </td>
        <td className="px-4 py-3 border text-right">
          {valve.meanGradient || 
            <span className="text-gray-400 italic">Not available</span>}
        </td>
        <td className="px-4 py-3 border text-right">
          {valve.eoa || 
            <span className="text-gray-400 italic">Not available</span>}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan="5" className="px-6 py-4 border">
            <div className="space-y-3">
              <h4 className="font-medium text-blue-900">
                Statistical Ranges (95% of values fall within ±2 SD)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ranges.peakGradient && (
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Peak Gradient Range</p>
                    <p className="font-medium">
                      {ranges.peakGradient.low} - {ranges.peakGradient.high} mmHg
                    </p>
                  </div>
                )}
                {ranges.meanGradient && (
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Mean Gradient Range</p>
                    <p className="font-medium">
                      {ranges.meanGradient.low} - {ranges.meanGradient.high} mmHg
                    </p>
                  </div>
                )}
                {ranges.eoa && (
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm text-gray-600">EOA Range</p>
                    <p className="font-medium">
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
  const [size, setSize] = useState("21")
  const [searchTerm, setSearchTerm] = useState("")

  const valveData = position === "Aortic" ? aorticValveData : mitralValveData

  // Filter valves based on search criteria
  const filteredValves = valveData.filter(valve => 
    (valve.size === size) &&
    (!searchTerm || valve.valve.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Prosthetic Valve Reference
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Reference values for prosthetic heart valves
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-4">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                About
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                Help
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Aortic">Aortic</option>
                <option value="Mitral">Mitral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size (mm)
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {[19, 21, 23, 25, 27, 29].map(s => (
                  <option key={s} value={s.toString()}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valve Name
              </label>
              <input
                type="text"
                placeholder="e.g., On-X"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto border-t">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 border text-left font-medium text-gray-700">Valve</th>
                  <th className="px-4 py-3 border text-center font-medium text-gray-700">Size (mm)</th>
                  <th className="px-4 py-3 border text-right font-medium text-gray-700">Peak Gradient (mmHg)</th>
                  <th className="px-4 py-3 border text-right font-medium text-gray-700">Mean Gradient (mmHg)</th>
                  <th className="px-4 py-3 border text-right font-medium text-gray-700">EOA (cm²)</th>
                </tr>
              </thead>
              <tbody>
                {filteredValves.length > 0 ? (
                  filteredValves.map((valve, index) => (
                    <ValveDataRow key={index} valve={valve} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      No matching valves found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}