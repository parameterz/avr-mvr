// components/ValveReference.js
'use client'

import React, { useState } from 'react'
import { mitralValveData } from '@/data/surgical/mitral'
import { aorticValveData } from '@/data/surgical/aortic'

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

// Component for displaying a single valve row and its expanded details
const ValveDataRow = ({ valve, columns }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate ranges for all measurements
  const ranges = {
    peakVelocity: calculateRange(valve.peakVelocity),
    peakGradient: calculateRange(valve.peakGradient),
    meanGradient: calculateRange(valve.meanGradient),
    pht: calculateRange(valve.pht),
    eoa: calculateRange(valve.eoa)
  };

  // Helper to handle displaying values or "data not available"
  const getValue = (key) => {
    return valve[key] || <span className="text-gray-400 italic">data not available</span>;
  };

  return (
    <>
      {/* Main valve data row */}
      <tr 
        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {columns.map(column => (
          <td 
            key={column.key}
            className={`px-6 py-4 border-b ${
              column.align === 'center' ? 'text-center' : 
              column.align === 'right' ? 'text-right' : 
              'text-left'
            } ${column.key === 'valve' ? 'font-medium text-gray-900' : ''}`}
          >
            {getValue(column.key)}
          </td>
        ))}
      </tr>

      {/* Expanded details showing statistical ranges */}
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan={columns.length} className="px-6 py-4 border-b">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900">
                Statistical Ranges (95% of values fall within ±2 SD)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(ranges).map(([key, range]) => {
                  // Only show ranges for measurements that are in the current columns
                  if (!range || !columns.find(col => col.key === key)) return null;
                  const label = columns.find(col => col.key === key)?.label;
                  return (
                    <div key={key} className="bg-white rounded-lg shadow-sm p-4">
                      <p className="text-sm text-gray-600 mb-1">{label} Range</p>
                      <p className="font-medium text-lg">
                        {range.low} - {range.high} {
                          key === 'peakVelocity' ? 'm/s' :
                          key === 'pht' ? 'ms' :
                          key === 'eoa' ? 'cm²' :
                          'mmHg'
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
// Main ValveReference component
export default function ValveReference() {
  // State management for filters
  const [position, setPosition] = useState("Aortic")
  const [type, setType] = useState("all")      
  const [size, setSize] = useState("all")      
  const [searchTerm, setSearchTerm] = useState("")

  // Get appropriate dataset based on selected position
  const valveData = position === "Aortic" ? aorticValveData : mitralValveData

  // Define columns based on position (different for Mitral vs Aortic)
  const getColumns = () => {
    if (position === "Mitral") {
      return [
        { key: 'valve', label: 'Valve', align: 'left' },
        { key: 'size', label: 'Size (mm)', align: 'center' },
        { key: 'peakVelocity', label: 'Peak Velocity (m/s)', align: 'right' },
        { key: 'peakGradient', label: 'Peak Gradient (mmHg)', align: 'right' },
        { key: 'meanGradient', label: 'Mean Gradient (mmHg)', align: 'right' },
        { key: 'pht', label: 'PHT (ms)', align: 'right' },
        { key: 'eoa', label: 'EOA (cm²)', align: 'right' }
      ];
    } else {
      return [
        { key: 'valve', label: 'Valve', align: 'left' },
        { key: 'size', label: 'Size (mm)', align: 'center' },
        { key: 'peakGradient', label: 'Peak Gradient (mmHg)', align: 'right' },
        { key: 'meanGradient', label: 'Mean Gradient (mmHg)', align: 'right' },
        { key: 'eoa', label: 'EOA (cm²)', align: 'right' }
      ];
    }
  };

  // Get available sizes based on current position and type selections
  const getAvailableSizes = () => {
    let availableValves = valveData;
    if (type !== 'all') {
      availableValves = availableValves.filter(valve => valve.type === type);
    }
    const sizes = [...new Set(availableValves.map(valve => valve.size))]
      .sort((a, b) => parseInt(a) - parseInt(b));
    return sizes;
  };

  // Reset size when position or type changes
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    setSize("all");
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSize("all");
  };

  // Filter valves based on all criteria
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

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-50 border-b border-gray-200">
            {/* Position Select */}
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

            {/* Type Select */}
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

            {/* Dynamic Size Select */}
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

            {/* Optional Search */}
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
                  {getColumns().map(column => (
                    <th 
                      key={column.key}
                      className={`px-6 py-3 text-${column.align} text-xs font-medium text-gray-500 uppercase tracking-wider border-b`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredValves.length > 0 ? (
                  filteredValves.map((valve, index) => (
                    <ValveDataRow 
                      key={index} 
                      valve={valve} 
                      columns={getColumns()}
                    />
                  ))
                ) : (
                  <tr>
                    <td 
                      colSpan={getColumns().length} 
                      className="px-6 py-8 text-center text-gray-500"
                    >
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