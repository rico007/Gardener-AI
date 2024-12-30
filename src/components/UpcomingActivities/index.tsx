import React from 'react';
import { useWorkSchedule } from '../../hooks/useWorkSchedule';
import { parseISO } from 'date-fns';
import { ActivityCard } from './ActivityCard';
import { LoadingState } from './LoadingState';
import type { Activity } from './types';

export default function UpcomingActivities() {
  const { schedule, isLoading } = useWorkSchedule();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!schedule?.crops) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800">Set your location to get activity recommendations.</p>
      </div>
    );
  }

  // Ensure we properly parse the date string to a Date object
  const allActivities: Activity[] = schedule.crops
    .flatMap(crop => 
      crop.actions.map(action => ({
        crop: crop.name,
        date: parseISO(action.date), // Parse ISO date string to Date object
        action: action.action,
        reason: action.reason,
        status: action.status || 'pending' // Provide default status
      }))
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-3">
      {allActivities.map((activity, index) => (
        <ActivityCard key={`${activity.crop}-${index}`} activity={activity} />
      ))}
    </div>
  );
}