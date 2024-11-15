// data/index.js

// Import surgical data
import { surgicalAorticValveData } from './surgical/aortic'
import { surgicalMitralValveData } from './surgical/mitral'
import { surgicalTricuspidValveData } from './surgical/tricuspid'  
import { surgicalPulmonaryValveData } from './surgical/pulmonary'  

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
    Tricuspid: surgicalTricuspidValveData,
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
export const VALVE_POSITIONS = ['Aortic', 'Mitral', 'Tricuspid', 'Pulmonary']; 
export const AVAILABLE_IMPLANTS = {
  Aortic: ['Surgical', 'Transcatheter'],
  Mitral: ['Surgical'],
  Tricuspid: ['Surgical'],
  Pulmonary: ['Surgical', 'Transcatheter']
};