import React from 'react';
import { Sprout, Calendar } from 'lucide-react';
import { useWorkSchedule } from '../hooks/useWorkSchedule';
import { format, parseISO } from 'date-fns';

export default function HarvestPlanning() {
  const { schedule, isLoading } = useWorkSchedule();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-20 bg-gray-100 rounded-lg"></div>
        <div className="h-20 bg-gray-100 rounded-lg"></div>
      </div>
    );
  }

  if (!schedule?.crops) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">Set your location to view harvest planning.</p>
      </div>
    );
  }

  const harvestActions = schedule.crops
    .flatMap(crop => crop.actions
      .filter(action => action.action.toLowerCase().includes('harvest'))
      .map(action => ({ crop: crop.name, ...action })))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-4">
      {harvestActions.map((action, index) => (
        <div key={index} className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-800">
                {format(parseISO(action.date), 'MMM d')}: {action.crop}
              </p>
              <p className="text-sm text-blue-600 mt-1">{action.reason}</p>
            </div>
          </div>
        </div>
      ))}

      {harvestActions.length === 0 && (
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-800">No upcoming harvests scheduled yet.</p>
        </div>
      )}
    </div>
  );
}