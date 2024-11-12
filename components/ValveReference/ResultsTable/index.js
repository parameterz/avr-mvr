// components/ValveReference/ResultsTable/index.js
import React from 'react'
import TableHeader from './TableHeader'
import ValveRow from './ValveRow'

export default function ResultsTable({ data, implantMethod, position }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <TableHeader 
          implantMethod={implantMethod} 
          position={position} 
        />
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((valve, index) => (
              <ValveRow 
                key={`${valve.valve}-${valve.size}-${index}`}
                valve={valve}
                implantMethod={implantMethod}
                position={position}
              />
            ))
          ) : (
            <tr>
              <td 
                colSpan={position === "Mitral" ? 7 : 5} 
                className="px-6 py-8 text-center text-gray-500"
              >
                No matching valves found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}