export interface CropImageMapping {
  [key: string]: string;
}

export interface Crop {
  name: string;
  image: string;
  actions: CropAction[];
}

export interface CropAction {
  date: string;
  action: string;
  reason: string;
  status: 'completed' | 'pending';
}