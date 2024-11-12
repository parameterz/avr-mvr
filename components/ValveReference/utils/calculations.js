// components/ValveReference/utils/calculations.js
export const calculateRange = (value) => {
    if (!value) return null;
    const parts = value.split('±').map(x => parseFloat(x.trim()));
    if (parts.length !== 2) return null;
    
    return {
      low: (parts[0] - 2 * parts[1]).toFixed(1),
      high: (parts[0] + 2 * parts[1]).toFixed(1)
    };
  };