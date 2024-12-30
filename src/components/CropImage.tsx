import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { getCropImageUrl } from '../utils/cropImages';

interface CropImageProps {
  name: string;
  className?: string;
}

export default function CropImage({ name, className = '' }: CropImageProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getCropImageUrl(name);

  if (imageError) {
    return (
      <div className={`bg-emerald-100 rounded-full flex items-center justify-center ${className}`}>
        <Sprout className="h-8 w-8 text-emerald-600" />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className={`rounded-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
}