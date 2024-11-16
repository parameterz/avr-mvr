'use client'

import React from 'react';
import { getColumns } from '../utils/constants';
import { calculateRange } from '../utils/calculations';
import CopyButton from './CopyButton';

const ValveRow = ({ valve, implantMethod, position, isExpanded, onToggle }) => {
  const columns = getColumns(implantMethod, position);
  
  return (
    <>
      <tr 
        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onToggle()}
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
            {column.key === 'valve' ? (
              <div className="flex items-center justify-between">
                <span>{valve[column.key]}</span>
                <CopyButton 
                  valve={valve} 
                  columns={columns} 
                  position={position}
                  implantMethod={implantMethod}
                />
              </div>
            ) : (
              valve[column.key] || 
              <span className="text-gray-400 italic">not available</span>
            )}
          </td>
        ))}
      </tr>
      
      {isExpanded && (
        <tr className="bg-blue-50 animate-fade-in">
          <td colSpan={columns.length} className="px-6 py-4 border-b">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900">
                Statistical Ranges (95% of values)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {columns.map(column => {
                  if (column.key === 'valve' || column.key === 'size' || 
                      column.key === 'type' || column.key === 'deployment') return null;

                  const range = calculateRange(valve[column.key]);
                  if (!range) return null;

                  return (
                    <div key={column.key} 
                      className="bg-white rounded-lg shadow-sm p-4 transition-transform hover:translate-y-[-2px]"
                    >
                      <p className="text-sm text-gray-600 mb-1">{column.label}</p>
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
  );
};

export default ValveRow;