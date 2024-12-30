import React from 'react';
import { Loader2, Droplets, Wind, Thermometer } from 'lucide-react';
import { useForecast } from '../hooks/useWeather';
import { getWeatherIcon, formatWindDirection, aggregateDailyForecasts } from '../utils/weather';
import { format } from 'date-fns';

export default function ForecastList() {
  const { forecast, isLoading, error } = useForecast();

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !forecast?.list) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-center">
          {error || 'Unable to load forecast data. Please check your API key and try again.'}
        </p>
      </div>
    );
  }

  const dailyForecasts = aggregateDailyForecasts(forecast.list).slice(0, 7);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Weather
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Temperature
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rainfall
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Humidity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wind
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dailyForecasts.map((day) => (
            <tr key={day.dt} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {format(new Date(day.dt * 1000), 'EEE, MMM d')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    src={getWeatherIcon(day.weather[0].icon)}
                    alt={day.weather[0].description}
                    className="h-8 w-8 mr-2"
                  />
                  <span className="text-sm text-gray-900">{day.weather[0].description}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm">
                  <Thermometer className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="font-medium">{Math.round(day.temp.day)}°C</span>
                  <span className="text-gray-500 ml-1">
                    ({Math.round(day.temp.min)}° / {Math.round(day.temp.max)}°)
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm">
                  <Droplets className="h-4 w-4 text-blue-400 mr-1" />
                  <span>{day.rain ? `${day.rain.toFixed(1)}mm` : '0mm'}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm">
                  <Droplets className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{day.humidity}%</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm">
                  <Wind className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{Math.round(day.wind.speed)} m/s</span>
                  <span className="text-gray-500 ml-1">
                    {formatWindDirection(day.wind.deg)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}