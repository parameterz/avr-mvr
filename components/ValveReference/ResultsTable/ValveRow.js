// components/ValveReference/ResultsTable/ValveRow.js
import React, { useState } from 'react'
import { getColumns } from '../utils/constants'
import { calculateRange } from '../utils/calculations'

export default function ValveRow({ valve, implantMethod, position }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const columns = getColumns(implantMethod, position)

  // Calculate ranges for all available measurements
  const ranges = {}
  columns.forEach(column => {
    if (column.key !== 'valve' && column.key !== 'size' && column.key !== 'type' && column.key !== 'deployment') {
      ranges[column.key] = calculateRange(valve[column.key])
    }
  })

  return (
    <>
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
            {valve[column.key] || <span className="text-gray-400 italic">data not available</span>}
          </td>
        ))}
      </tr>

      {/* Expanded view with statistical ranges */}
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan={columns.length} className="px-6 py-4 border-b">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900">
                Statistical Ranges (95% of values fall within ±2 SD)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(ranges).map(([key, range]) => {
                  if (!range) return null;
                  const column = columns.find(col => col.key === key);
                  if (!column) return null;

                  return (
                    <div key={key} className="bg-white rounded-lg shadow-sm p-4">
                      <p className="text-sm text-gray-600 mb-1">{column.label} Range</p>
                      <p className="font-medium text-lg">
                        {range.low} - {range.high} {column.unit}
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
  )
}