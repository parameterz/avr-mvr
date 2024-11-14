// components/ValveReference/ResultsTable/ValveRow.js
'use client'

import React from 'react'
import { getColumns } from '../utils/constants'
import { calculateRange } from '../utils/calculations'

const formatValue = (value, unit, label) => {
  if (!value) return <span className="text-gray-400 italic">not available</span>;

  const tooltipText = value.startsWith('≤') || value.startsWith('<') 
    ? `Maximum reference value for ${label.toLowerCase()}`
    : value.includes('±') 
    ? 'Mean ± Standard Deviation'
    : value.includes('(') 
    ? 'Median (Interquartile Range)'
    : null;

  return (
    <div 
      className="group relative"
      onClick={(e) => e.stopPropagation()} // Stop row click from interfering
    >
      {value.startsWith('≤') || value.startsWith('<') ? (
        <div className="flex items-center justify-end space-x-1">
          <span className="text-blue-600 font-medium">{value.charAt(0)}</span>
          <span>{value.substring(1)}</span>
          {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
        </div>
      ) : value.includes('(') ? (
        <div className="text-right">
          <div>{value.split(' (')[0]}</div>
          <div className="text-sm text-gray-500">({value.split('(')[1]}</div>
        </div>
      ) : (
        <div className="flex justify-end items-center">
          <span>{value}</span>
          {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
        </div>
      )}

      {tooltipText && (
        <div className="hidden group-hover:block absolute z-20 px-2 py-1 
                      text-xs text-white bg-gray-800 rounded -top-8 right-0 
                      whitespace-nowrap pointer-events-none">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

const ValveRow = ({ valve, implantMethod, position, isExpanded, onToggle }) => {
  const columns = getColumns(implantMethod, position);
  
  return (
    <>
      <tr 
        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        onClick={onToggle}
        role="button"
        tabIndex={0}
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
            {column.key === 'valve' || column.key === 'type' || column.key === 'deployment' 
              ? valve[column.key]
              : formatValue(valve[column.key], column.unit, column.label)}
          </td>
        ))}
      </tr>
      
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan={columns.length} className="px-6 py-4 border-b">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900">
                Statistical Ranges
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {columns.map(column => {
                  if (column.key === 'valve' || column.key === 'size' || 
                      column.key === 'type' || column.key === 'deployment') return null;

                  const range = calculateRange(valve[column.key]);
                  if (!range) return null;

                  return (
                    <div key={column.key} className="bg-white rounded-lg shadow-sm p-4">
                      <p className="text-sm text-gray-600 mb-1">{column.label}</p>
                      <p className="font-medium text-lg">
                        {range.low} - {range.high} {column.unit}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {range.method === 'SD' ? '95% of values (±2 SD)' : 'Interquartile Range'}
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

export default ValveRow;