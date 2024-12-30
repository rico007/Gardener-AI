export interface CropTiming {
  name: string;
  plantingWindows: {
    spring?: {
      start: string; // MM-DD
      end: string;   // MM-DD
      soilTemp: number;
    };
    fall?: {
      start: string;
      end: string;
      soilTemp: number;
    };
  };
  spacing: {
    between: number; // cm
    depth: number;   // cm
  };
}

export interface WeatherSummary {
  date: string;
  temp: number;
  description: string;
  precipitation: number;
  location: string;
}

export interface CropAction {
  date: string;
  action: string;
  reason: string;
  status: 'completed' | 'pending';
  soilPrep?: {
    temperature: number;
    preparation: string[];
  };
  spacing?: {
    between: number;
    depth: number;
  };
  watering?: {
    frequency: string;
    amount: string;
  };
}