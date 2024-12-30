import { CropTiming } from '../types/agriculture';

export const cropTimings: Record<string, CropTiming> = {
  carrots: {
    name: 'Carrots',
    plantingWindows: {
      spring: {
        start: '03-20',
        end: '04-10',
        soilTemp: 7
      },
      fall: {
        start: '07-20',
        end: '08-10',
        soilTemp: 7
      }
    },
    spacing: {
      between: 5,
      depth: 1
    }
  },
  // Add more crops with their timing windows
};