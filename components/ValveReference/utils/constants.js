// components/ValveReference/utils/constants.js
export const getColumns = (implantMethod, position) => {
  const baseColumns = [
    { key: 'valve', label: 'Valve', align: 'left' },
    { key: 'size', label: 'Size (mm)', align: 'center' }
  ];

  if (implantMethod === "Surgical") {
    if (position === "Pulmonary") {  // Add Pulmonary first
      return [
        ...baseColumns,
        { key: 'type', label: 'Type', align: 'center' },
        { key: 'peakVelocity', label: 'Peak Velocity', align: 'right', unit: 'm/sec' },
        { key: 'peakGradient', label: 'Peak Gradient', align: 'right', unit: 'mmHg' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'at', label: 'AT', align: 'right', unit: 'msec' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' }
      ];
    } else if (position === "Mitral") {
      return [
        ...baseColumns,
        { key: 'type', label: 'Type', align: 'center' },
        { key: 'peakVelocity', label: 'Peak Velocity', align: 'right', unit: 'm/s' },
        { key: 'peakGradient', label: 'Peak Gradient', align: 'right', unit: 'mmHg' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'pht', label: 'PHT', align: 'right', unit: 'ms' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' }
      ];
    } else if (position === "Tricuspid") {
      return [
        ...baseColumns,
        { key: 'type', label: 'Type', align: 'center' },
        { key: 'eVelocity', label: 'Peak E Velocity', align: 'right', unit: 'm/s' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'vtiTvp', label: 'VTI', align: 'right', unit: 'cm' },
        { key: 'vtiRatio', label: 'Dimensionless Index (TVp/LVOT)', align: 'right', unit: '' },
        { key: 'pht', label: 'PHT', align: 'right', unit: 'ms' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' },
        { key: 'ieoa', label: 'Indexed EOA', align: 'right', unit: 'cm²/m²' },
      ];
    } else { //aortic
      return [
        ...baseColumns,
        { key: 'type', label: 'Type', align: 'center' },
        { key: 'peakGradient', label: 'Peak Gradient', align: 'right', unit: 'mmHg' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' }
      ];
    }
  } else {
    // For transcatheter valves, we might want to check position too
    if (position === "Pulmonary") {
      return [
        ...baseColumns,
        { key: 'deployment', label: 'Deployment', align: 'center' },
        { key: 'peakVelocity', label: 'Peak Velocity', align: 'right', unit: 'm/sec' },
        { key: 'peakGradient', label: 'Peak Gradient', align: 'right', unit: 'mmHg' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' }
      ];
    } else {
      // Other transcatheter valves (Aortic)
      return [
        ...baseColumns,
        { key: 'deployment', label: 'Deployment', align: 'center' },
        { key: 'meanGradient', label: 'Mean Gradient', align: 'right', unit: 'mmHg' },
        { key: 'eoa', label: 'EOA', align: 'right', unit: 'cm²' },
        { key: 'dvi', label: 'DVI', align: 'right', unit: '' }
      ];
    }
  }
};