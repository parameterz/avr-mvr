'use client'

import React, { useState } from 'react'
import { getColumns } from '../utils/constants'
import { calculateRange } from '../utils/calculations'

// Mobile card component with touch optimizations
const MobileValveCard = ({ valve, implantMethod, position, onExpand, isExpanded }) => {
  const [isTouched, setIsTouched] = useState(false);
  const columns = getColumns(implantMethod, position);
  
  return (
    <div 
      className={`bg-white p-4 border-b transition-all duration-150 touch-feedback
        ${isTouched ? 'bg-gray-50' : ''}
        active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => {
        setIsTouched(false);
        onExpand();
      }}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900 leading-tight">{valve.valve}</h3>
        <span className="ml-2 px-2 py-1 bg-gray-100 text-sm font-medium rounded-full text-gray-600">
          {valve.size} mm
        </span>
      </div>

      {/* Type/Deployment Info */}
      <div className="mt-2 text-sm text-gray-500">
        {implantMethod === "Surgical" ? valve.type : valve.deployment}
      </div>

      {/* Measurements Grid */}
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {columns.map(column => {
          if (column.key === 'valve' || column.key === 'size' || 
              column.key === 'type' || column.key === 'deployment') return null;

          return valve[column.key] ? (
            <div key={column.key} className="text-sm">
              <dt className="text-gray-500">{column.label}</dt>
              <dd className="font-medium mt-0.5">{valve[column.key]}</dd>
            </div>
          ) : null;
        })}
      </dl>

      {/* Expanded View */}
      {isExpanded && (
        <div 
          className="mt-4 pt-4 border-t animate-fade-in"
          onClick={(e) => e.stopPropagation()} // Prevent collapse when interacting
        >
          <h4 className="text-sm font-medium text-blue-900 mb-3">
            Statistical Ranges (95% of values)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {columns.map(column => {
              if (column.key === 'valve' || column.key === 'size' || 
                  column.key === 'type' || column.key === 'deployment') return null;

              const range = calculateRange(valve[column.key]);
              if (!range) return null;

              return (
                <div key={column.key} 
                  className="bg-blue-50 p-3 rounded-lg transition-transform active:scale-98"
                >
                  <div className="text-sm text-gray-600 mb-1">{column.label}</div>
                  <div className="font-medium">
                    {range.low} - {range.high} {column.unit}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Desktop row component with interactive improvements
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
            {valve[column.key] || 
              <span className="text-gray-400 italic">not available</span>}
          </td>
        ))}
      </tr>
      
      {/* Expanded Details */}
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

// Main ResultsTable component
export default function ResultsTable({ data, implantMethod, position }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden overscroll-contain">
        <div className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((valve, index) => (
              <MobileValveCard
                key={`${valve.valve}-${valve.size}-${index}`}
                valve={valve}
                implantMethod={implantMethod}
                position={position}
                onExpand={() => setExpandedId(expandedId === index ? null : index)}
                isExpanded={expandedId === index}
              />
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              No matching valves found
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto overscroll-x-contain">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {getColumns(implantMethod, position).map(column => (
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
            {data.length > 0 ? (
              data.map((valve, index) => (
                <ValveRow
                  key={`${valve.valve}-${valve.size}-${index}`}
                  valve={valve}
                  implantMethod={implantMethod}
                  position={position}
                  isExpanded={expandedId === index}
                  onToggle={() => setExpandedId(expandedId === index ? null : index)}
                />
              ))
            ) : (
              <tr>
                <td 
                  colSpan={getColumns(implantMethod, position).length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No matching valves found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}