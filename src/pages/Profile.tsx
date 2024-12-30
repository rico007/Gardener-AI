import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, MapPin } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import ApiKeyInput from '../components/ApiKeyInput';
import LocationSearch from '../components/LocationSearch';
import { validateOpenWeatherKey, validateOpenAIKey } from '../utils/api-validators';

export default function Profile() {
  const navigate = useNavigate();
  const { 
    openWeatherKey, 
    openAIKey, 
    setOpenWeatherKey, 
    setOpenAIKey,
  } = useSettingsStore();

  const [tempOpenWeatherKey, setTempOpenWeatherKey] = useState(openWeatherKey);
  const [tempOpenAIKey, setTempOpenAIKey] = useState(openAIKey);

  const handleSave = () => {
    setOpenWeatherKey(tempOpenWeatherKey);
    setOpenAIKey(tempOpenAIKey);
    navigate('/'); // Navigate to dashboard after saving
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <ApiKeyInput
              label="OpenWeather API Key"
              value={tempOpenWeatherKey}
              onChange={setTempOpenWeatherKey}
              onValidate={validateOpenWeatherKey}
            />

            <ApiKeyInput
              label="OpenAI API Key"
              value={tempOpenAIKey}
              onChange={setTempOpenAIKey}
              onValidate={validateOpenAIKey}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferences</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <span>Weather Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Units</span>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="metric">Metric (°C, mm)</option>
                <option value="imperial">Imperial (°F, in)</option>
              </select>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>Default Location</span>
              </div>
              <LocationSearch />
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleSave}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}