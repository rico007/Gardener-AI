import React from 'react';
import LocationSearch from '../components/LocationSearch';
import WeatherTile from '../components/WeatherTile';
import UpcomingActivities from '../components/UpcomingActivities';
import HarvestPlanning from '../components/HarvestPlanning';

export default function WeatherDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <LocationSearch />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WeatherTile />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Activities</h3>
          <UpcomingActivities />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Harvest Planning</h3>
          <HarvestPlanning />
        </div>
      </div>
    </div>
  );
}