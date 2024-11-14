// data/index.js

// Import surgical data
import { surgicalAorticValveData } from './surgical/aortic'
import { surgicalMitralValveData } from './surgical/mitral'
// import { surgicalTricuspidValveData } from './surgical/tricuspid'  // When ready
import { surgicalPulmonaryValveData } from './surgical/pulmonary'  // When ready

// Import transcatheter data
import { transcatheterAorticValveData } from './transcatheter/aortic'
// import { transcatheterMitralValveData } from './transcatheter/mitral'  // When ready
// import { transcatheterTricuspidValveData } from './transcatheter/tricuspid'  // When ready
import { transcatheterPulmonaryValveData } from './transcatheter/pulmonary'  // When ready

// Export organized data structure
export const valveData = {
  Surgical: {
    Aortic: surgicalAorticValveData,
    Mitral: surgicalMitralValveData,
    // Tricuspid: surgicalTricuspidValveData,  // When ready
    Pulmonary: surgicalPulmonaryValveData   
  },
  Transcatheter: {
    Aortic: transcatheterAorticValveData,
    // Mitral: transcatheterMitralValveData,   // When ready
    // Tricuspid: transcatheterTricuspidValveData,  // When ready
    Pulmonary: transcatheterPulmonaryValveData   
  }
};

// Export useful constants
export const IMPLANT_METHODS = ['Surgical', 'Transcatheter'];
export const VALVE_POSITIONS = ['Aortic', 'Mitral', 'Pulmonary']; // Add others when ready