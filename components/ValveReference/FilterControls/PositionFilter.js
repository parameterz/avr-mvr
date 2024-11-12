// components/ValveReference/FilterControls/PositionFilter.js
import React from 'react'
import { VALVE_POSITIONS } from '@/data'

export default function PositionFilter({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Position
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
      >
        {VALVE_POSITIONS.map(position => (
          <option key={position} value={position}>{position}</option>
        ))}
      </select>
    </div>
  )
}