// components/ValveReference/utils/calculations.js

/**
 * Original range calculation function (kept for backward compatibility)
 */
export const calculateRange = (value) => {
  if (!value) return null;
  const parts = value.split('±').map(x => parseFloat(x.trim()));
  if (parts.length !== 2) return null;
  
  return {
    low: (parts[0] - 2 * parts[1]).toFixed(1),
    high: (parts[0] + 2 * parts[1]).toFixed(1)
  };
};

/**
 * Calculates clinically relevant ranges for EOA values
 */
export const calculateEOARanges = (value) => {
  if (!value) return null;
  const parts = value.split('±').map(x => parseFloat(x.trim()));
  if (parts.length !== 2) return null;
  
  const [mean, sd] = parts;
  
  return {
    normalRange: {
      low: (mean - sd).toFixed(1),
      high: (mean + sd).toFixed(1)
    },
    possibleStenosis: {
      low: (mean - 2 * sd).toFixed(1),
      high: (mean - sd).toFixed(1)
    },
    significantStenosis: {
      value: (mean - 2 * sd).toFixed(1),
      description: "Less than"
    }
  };
};