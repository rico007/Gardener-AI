import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WeatherDashboard from './pages/WeatherDashboard';
import CropManagement from './pages/CropManagement';
import Forecast from './pages/Forecast';
import WorkSchedule from './pages/WorkSchedule';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WeatherDashboard />} />
          <Route path="crops" element={<CropManagement />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="schedule" element={<WorkSchedule />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}