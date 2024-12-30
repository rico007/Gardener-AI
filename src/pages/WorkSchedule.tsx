import React from 'react';
import { Loader2 } from 'lucide-react';
import { useWorkSchedule } from '../hooks/useWorkSchedule';
import WorkScheduleTimeline from '../components/WorkScheduleTimeline';
import LocationSearch from '../components/LocationSearch';

export default function WorkSchedule() {
  const { schedule, isLoading, error } = useWorkSchedule();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <LocationSearch />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">3-Month Work Schedule</h2>
        
        {isLoading && (
          <div className="flex justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-red-800">Unable to generate work schedule. Please ensure your OpenAI API key is valid.</p>
          </div>
        )}

        {schedule && !isLoading && (
          <WorkScheduleTimeline crops={schedule.crops} />
        )}

        {!schedule && !isLoading && !error && (
          <div className="text-center p-12 text-gray-500">
            <p>Select a location to generate work schedule recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
}