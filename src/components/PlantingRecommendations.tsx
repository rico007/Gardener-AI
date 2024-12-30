import React from 'react';
import { Sprout, AlertTriangle } from 'lucide-react';
import { useWorkSchedule } from '../hooks/useWorkSchedule';
import { format, isToday, parseISO } from 'date-fns';

export default function PlantingRecommendations() {
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
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800">Set your location to get planting recommendations.</p>
      </div>
    );
  }

  const todaysActions = schedule.crops
    .flatMap(crop => crop.actions
      .filter(action => isToday(parseISO(action.date)))
      .map(action => ({ crop: crop.name, ...action }))
    );

  const upcomingActions = schedule.crops
    .flatMap(crop => crop.actions
      .filter(action => parseISO(action.date) > new Date())
      .map(action => ({ crop: crop.name, ...action }))
    )
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 2);

  return (
    <div className="space-y-4">
      {todaysActions.map((action, index) => (
        <div key={index} className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Sprout className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-green-800">{action.action}</p>
              <p className="text-sm text-green-600 mt-1">
                For: {action.crop}
              </p>
            </div>
          </div>
        </div>
      ))}

      {upcomingActions.map((action, index) => (
        <div key={index} className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-yellow-800">
                {format(parseISO(action.date), 'MMM d')}: {action.action}
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                For: {action.crop}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}