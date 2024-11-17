'use client'

import React, { useState } from 'react';
import { getColumns } from '../utils/constants';
import MobileValveCard from './MobileValveCard';
import ValveRow from './ValveRow';

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