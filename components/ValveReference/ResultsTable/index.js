//components/ValveReference/ResultsTable/index.js
'use client'

import React, { useState } from 'react';
import { getColumns } from '../utils/constants';
import { calculateEOARanges } from '../utils/calculations';
import ValveRow from './ValveRow';

// Mobile card component with touch optimizations
const MobileValveCard = ({ valve, implantMethod, position, onExpand, isExpanded }) => {
  const [isTouched, setIsTouched] = useState(false);
  const columns = getColumns(implantMethod, position);
  
  const renderEOARanges = (eoaValue) => {
    const ranges = calculateEOARanges(eoaValue);
    if (!ranges) return null;

    return (
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white rounded-lg shadow-sm p-3">
          <p className="text-sm text-gray-600 mb-1">Normal Range (±1 SD)</p>
          <p className="font-medium text-green-600">
            {ranges.normalRange.low} - {ranges.normalRange.high} cm²
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3">
          <p className="text-sm text-gray-600 mb-1">Possible Stenosis (-1 to -2 SD)</p>
          <p className="font-medium text-yellow-600">
            {ranges.possibleStenosis.low} - {ranges.possibleStenosis.high} cm²
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3">
          <p className="text-sm text-gray-600 mb-1">Significant Stenosis</p>
          <p className="font-medium text-red-600">
            Less than {ranges.significantStenosis.value} cm²
          </p>
        </div>
      </div>
    );
  };

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

      {/* Expanded View - EOA Ranges Only */}
      {isExpanded && valve.eoa && (
        <div 
          className="mt-4 pt-4 border-t animate-fade-in"
          onClick={(e) => e.stopPropagation()} // Prevent collapse when interacting
        >
          <h4 className="text-sm font-medium text-blue-900 mb-3">
            EOA Reference Ranges
          </h4>
          {renderEOARanges(valve.eoa)}
        </div>
      )}
    </div>
  );
};

// Main ResultsTable component remains the same
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

      {/* Desktop View - unchanged */}
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