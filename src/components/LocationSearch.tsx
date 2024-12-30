import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';

interface LocationSearchProps {
  onSearch?: () => void;
  className?: string;
}

export default function LocationSearch({ onSearch, className = '' }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { openWeatherKey, setLocation } = useSettingsStore();

  const handleSearch = async () => {
    if (!searchTerm || !openWeatherKey) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchTerm)}&limit=1&appid=${openWeatherKey}`
      );
      const [data] = await response.json();
      
      if (data) {
        setLocation(data.name, { lat: data.lat, lon: data.lon });
        onSearch?.();
      }
    } catch (error) {
      console.error('Failed to search location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search location..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <button
        onClick={handleSearch}
        disabled={isLoading || !openWeatherKey}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Search'}
      </button>
    </div>
  );
}