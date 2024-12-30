export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  userId: string;
}

export interface Crop {
  id: string;
  name: string;
  type: string;
  plantingDate: Date;
  harvestDate: Date | null;
  locationId: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    notifications: boolean;
    units: 'metric' | 'imperial';
  };
}