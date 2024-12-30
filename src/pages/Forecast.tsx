import React from 'react';
import LocationSearch from '../components/LocationSearch';
import ForecastList from '../components/ForecastList';

export default function Forecast() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <LocationSearch />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">7-Day Forecast</h2>
        <ForecastList />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Agricultural Impact</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">High temperature alert for crops</p>
              <p className="text-sm text-yellow-600 mt-1">
                Consider additional irrigation for the next 3 days
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">Optimal harvesting conditions</p>
              <p className="text-sm text-green-600 mt-1">
                Plan harvest activities for Friday
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Precipitation Forecast</h3>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Precipitation chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}