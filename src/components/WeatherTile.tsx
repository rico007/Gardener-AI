import React from 'react';
import { Loader2, CloudRain, Thermometer, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import { useWeather, useForecast } from '../hooks/useWeather';
import { getWeatherIcon } from '../utils/weather';

export default function WeatherTile() {
  const { weather, isLoading: weatherLoading, error: weatherError } = useWeather();
  const { forecast, isLoading: forecastLoading } = useForecast();

  const isLoading = weatherLoading || forecastLoading;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (weatherError || !weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Unable to load weather data</p>
      </div>
    );
  }

  // Get today's forecast for min/max temps and rainfall
  const todayForecast = forecast?.list?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Current Weather</h3>
        <div className="flex items-center">
          <img 
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="h-12 w-12"
          />
          <span className="text-gray-600 ml-2 capitalize">{weather.weather[0].description}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Current Temperature</span>
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-2xl font-medium">{Math.round(weather.main.temp)}°C</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Today's High</span>
          <div className="flex items-center">
            <ArrowUp className="h-5 w-5 text-orange-500 mr-2" />
            <span className="text-lg font-medium">
              {Math.round(todayForecast?.main.temp_max || weather.main.temp_max)}°C
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Today's Low</span>
          <div className="flex items-center">
            <ArrowDown className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-lg font-medium">
              {Math.round(todayForecast?.main.temp_min || weather.main.temp_min)}°C
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Expected Rain</span>
          <div className="flex items-center">
            <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-lg font-medium">
              {todayForecast?.rain?.['3h'] ? `${todayForecast.rain['3h'].toFixed(1)}mm` : '0mm'}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Humidity</span>
          <div className="flex items-center">
            <CloudRain className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-lg font-medium">{weather.main.humidity}%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Wind Speed</span>
          <div className="flex items-center">
            <Wind className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-lg font-medium">{Math.round(weather.wind.speed)} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}