import React from 'react';
import { MapPin } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

export default function LocationDisplay() {
  const location = useSettingsStore((state) => state.location);

  if (!location) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <MapPin className="h-4 w-4" />
      <span>{location}</span>
    </div>
  );
}