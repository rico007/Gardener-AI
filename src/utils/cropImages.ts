import { CropImageMapping } from '../types/crops';

// Reliable Unsplash image URLs for common garden vegetables and herbs
export const cropImages: CropImageMapping = {
  'tomatoes': 'https://images.unsplash.com/photo-1592818868295-f471e17a6936',
  'basil': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733',
  'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1',
  'carrots': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
  'peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83',
  'strawberries': 'https://images.unsplash.com/photo-1543158181-e6f9f6712055',
  'herbs': 'https://images.unsplash.com/photo-1620101680155-b251161879ea',
  'default': 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8'
};

export function getCropImageUrl(cropName: string): string {
  const normalizedName = cropName.toLowerCase();
  const imageUrl = cropImages[normalizedName] || cropImages.default;
  return `${imageUrl}?auto=format&fit=crop&w=200&h=200`;
}