import React from 'react';

export function LoadingState() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
      ))}
    </div>
  );
}