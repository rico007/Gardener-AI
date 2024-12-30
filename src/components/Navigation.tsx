import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Sun, Cloud, Calendar, User } from 'lucide-react';
import LocationDisplay from './LocationDisplay';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Cloud, label: 'Weather' },
    { path: '/crops', icon: Sprout, label: 'My Garden' },
    { path: '/forecast', icon: Sun, label: 'Forecast' },
    { path: '/schedule', icon: Calendar, label: 'Garden Tasks' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Sprout className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Gardener AI</span>
            <div className="ml-4 border-l pl-4">
              <LocationDisplay />
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === path
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;