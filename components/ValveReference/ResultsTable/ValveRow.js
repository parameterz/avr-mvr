'use client'

import React from 'react';
import { getColumns } from '../utils/constants';
import { calculateEOARanges } from '../utils/calculations';
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
      
      {isExpanded && valve.eoa && (
        <tr className="bg-blue-50 animate-fade-in">
          <td colSpan={columns.length} className="px-6 py-4 border-b">
            <div className="space-y-4">
              <h4 className="font-medium text-blue-900">
                EOA Reference Ranges (cm²)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const ranges = calculateEOARanges(valve.eoa);
                  if (!ranges) return null;

                  return (
                    <>
                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600 mb-1">Normal Range (±1 SD)</p>
                        <p className="font-medium text-lg text-green-600">
                          {ranges.normalRange.low} - {ranges.normalRange.high}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600 mb-1">Possible Stenosis (-1 to -2 SD)</p>
                        <p className="font-medium text-lg text-yellow-600">
                          {ranges.possibleStenosis.low} - {ranges.possibleStenosis.high}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <p className="text-sm text-gray-600 mb-1">Significant Stenosis</p>
                        <p className="font-medium text-lg text-red-600">
                          Less than {ranges.significantStenosis.value}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ValveRow;