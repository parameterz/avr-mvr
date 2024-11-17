'use client'

import React from 'react';
import { getColumns } from '../utils/constants';
import { renderEOARanges } from '../utils/renderEOARanges';

const MobileValveCard = ({ valve, implantMethod, position, onExpand, isExpanded }) => {
  const columns = getColumns(implantMethod, position);  // Added this line to get columns

  return (
    <div 
      className="bg-white p-4 border-b transition-colors duration-150 active:bg-gray-100"
      onClick={onExpand}
      role="button"
      tabIndex={0}
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
          onClick={(e) => e.stopPropagation()} 
        >
          {renderEOARanges(valve.eoa, true)}
        </div>
      )}
    </div>
  );
};

export default MobileValveCard;