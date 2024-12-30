import React from 'react';
import { Calendar, Sprout } from 'lucide-react';
import { format, isToday } from 'date-fns';
import type { Activity } from './types';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div 
      className={`p-4 rounded-lg ${
        isToday(activity.date) 
          ? 'bg-green-50 border-l-4 border-green-500' 
          : 'bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {isToday(activity.date) ? (
          <Sprout className="h-5 w-5 text-green-600 mt-0.5" />
        ) : (
          <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              {format(activity.date, 'MMM d')}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {activity.crop}
            </span>
          </div>
          <p className="text-gray-900 font-medium mt-1">{activity.action}</p>
          <p className="text-sm text-gray-600 mt-1">{activity.reason}</p>
        </div>
      </div>
    </div>
  );
}