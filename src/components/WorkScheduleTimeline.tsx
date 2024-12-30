import React from 'react';
import { Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import CropImage from './CropImage';
import type { Crop } from '../types/crops';

interface WorkScheduleTimelineProps {
  crops: Crop[];
}

export default function WorkScheduleTimeline({ crops }: WorkScheduleTimelineProps) {
  return (
    <div className="space-y-8">
      {crops.map((crop, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <CropImage name={crop.name} className="w-16 h-16" />
            <h3 className="text-lg font-semibold">{crop.name}</h3>
          </div>
          
          <div className="relative">
            <div className="absolute left-1.5 h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-6">
              {crop.actions.map((action, actionIndex) => (
                <div key={actionIndex} className="relative pl-8">
                  <div 
                    className={`absolute left-0 w-3 h-3 rounded-full ${
                      actionIndex === 0 ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  ></div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 mt-1" />
                    <time className="text-sm text-gray-500">
                      {format(parseISO(action.date), 'MMM d, yyyy')}
                    </time>
                  </div>
                  <p className="font-medium mt-1">{action.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{action.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}