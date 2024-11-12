// components/ValveReference/ResultsTable/TableHeader.js
import React from 'react'
import { getColumns } from '../utils/constants'

export default function TableHeader({ implantMethod, position }) {
  const columns = getColumns(implantMethod, position)

  return (
    <thead>
      <tr className="bg-gray-50">
        {columns.map(column => (
          <th 
            key={column.key}
            className={`px-6 py-3 text-${column.align} text-xs font-medium text-gray-500 uppercase tracking-wider border-b`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}