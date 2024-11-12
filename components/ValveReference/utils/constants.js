// components/ValveReference/utils/constants.js
export const getColumns = (implantMethod, position) => {
    const baseColumns = [
      { key: 'valve', label: 'Valve', align: 'left' },
      { key: 'size', label: 'Size (mm)', align: 'center' }
    ];
  
    if (implantMethod === "Surgical") {
      if (position === "Mitral") {
        return [
          ...baseColumns,
          { key: 'type', label: 'Type', align: 'center' },
          { key: 'peakVelocity', label: 'Peak Velocity', align: 'right', unit: 'm/s' },
          { key: 'peakGradient', label: 'Peak Gradient', align: 'right', unit: 'mmHg' },
          { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
          { key: 'pht', label: 'PHT', align: 'right', unit: 'ms' },
          { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' }
        ];
      } else {
        return [
          ...baseColumns,
          { key: 'type', label: 'Type', align: 'center' },
          { key: 'peakGradient', label: 'Peak Gradient', align: 'right', unit: 'mmHg' },
          { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
          { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' }
        ];
      }
    } else {
      // Transcatheter valves
      return [
        ...baseColumns,
        { key: 'deployment', label: 'Deployment', align: 'center' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' },
        { key: 'dvi', label: 'DVI', align: 'right', unit: '' }
      ];
    }
  };