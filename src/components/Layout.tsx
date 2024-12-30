import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sprout, Sun, Cloud, User } from 'lucide-react';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}