'use client'

import React, { useState } from 'react';

const CopyButton = ({ valve, columns, position, implantMethod }) => {
  const [copied, setCopied] = useState(false);

  const formatValueForCopy = (value, unit) => {
    if (!value) return null;
    
    // Handle special cases
    if (value.startsWith('≤') || value.startsWith('<')) {
      return `${value}${unit ? ' ' + unit : ''}`;
    } else if (value.includes('(')) {
      return `${value}${unit ? ' ' + unit : ''}`;
    } else {
      return `${value}${unit ? ' ' + unit : ''}`;
    }
  };

  const formatValveData = () => {
    const lines = [
      'Reference values for:',
      `${valve.valve} ${valve.size}mm`,
      `${position} Position`,
    ];

    // // Add type for surgical or deployment for transcatheter
    // if (valve.type) {
    //   lines.push(`Type: ${valve.type}`);
    // } else if (valve.deployment) {
    //   lines.push(`Deployment: ${valve.deployment}`);
    // }
    lines.push ('--------------------')

    // Add all measurement values with their units
    columns.forEach(column => {
      if (column.key !== 'valve' && column.key !== 'size' && 
          column.key !== 'type' && column.key !== 'deployment' && 
          valve[column.key]) {
        const formattedValue = formatValueForCopy(valve[column.key], column.unit);
        if (formattedValue) {
          lines.push(`${column.label}: ${formattedValue}`);
        }
      }
    });
    lines.push ('--------------------')
    lines.push ('Zoghbi et al., JASE, Jan. 2024');


    return lines.join('\n');
  };

  const handleCopy = async (e) => {
    e.stopPropagation(); // Prevent row expansion when clicking copy button
    try {
      await navigator.clipboard.writeText(formatValveData());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150
        ${copied 
          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
          : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 hover:text-blue-700'
        }`}
      title="Copy valve data"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;