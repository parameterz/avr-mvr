// components/ValveReference/FilterControls/ImplantFilter.js
import React from 'react'
import { IMPLANT_METHODS } from '@/data'

export default function ImplantFilter({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Implant Method
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
      >
        {IMPLANT_METHODS.map(method => (
          <option key={method} value={method}>{method}</option>
        ))}
      </select>
    </div>
  )
}