import React from 'react';
import { Sprout, Calendar, Droplets } from 'lucide-react';
import CropImage from '../components/CropImage';

export default function CropManagement() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Garden</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <Sprout className="h-5 w-5" />
              Add New Plant
            </button>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <CropImage name="tomatoes" className="w-16 h-16" />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Cherry Tomatoes</h3>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      Growing
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Planted: March 1, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      <span>Next watering: Tomorrow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Growth Timeline</h3>
            <div className="relative">
              <div className="absolute left-1.5 h-full w-0.5 bg-emerald-200"></div>
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <p className="font-medium">Seedling Stage</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <p className="font-medium">Vegetative Growth</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 w-3 h-3 bg-gray-300 rounded-full"></div>
                  <p className="font-medium">Flowering</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}