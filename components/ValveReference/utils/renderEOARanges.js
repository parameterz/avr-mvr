'use client'

import { calculateEOARanges } from './calculations';

export const renderEOARanges = (eoaValue, isMobile = false) => {
  const ranges = calculateEOARanges(eoaValue);
  if (!ranges) return null;

  return (
    <div className="space-y-4">
      <h4 className={`font-medium text-blue-900 ${isMobile ? 'text-sm' : ''} mb-3`}>
        EOA Reference Ranges (cm²)
      </h4>
      <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-4`}>
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
      </div>
    </div>
  );
};