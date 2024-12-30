import { useState, useEffect, useCallback } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useForecast } from './useWeather';
import { getWorkScheduleRecommendations } from '../utils/ai';
import { validateOpenAIKey } from '../utils/api-validators';

export function useWorkSchedule() {
  const [schedule, setSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { openAIKey, coordinates } = useSettingsStore();
  const { forecast } = useForecast();

  const generateSchedule = useCallback(async () => {
    if (!forecast || !openAIKey || !coordinates) {
      setSchedule(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Validate the OpenAI key before making the request
      const isValid = await validateOpenAIKey(openAIKey);
      if (!isValid) {
        throw new Error('Invalid OpenAI API key');
      }

      const weatherSummary = forecast.list.map(item => ({
        date: new Date(item.dt * 1000).toISOString().split('T')[0],
        temp: item.main.temp,
        description: item.weather[0].description,
        precipitation: item.rain?.['3h'] || 0,
        location: coordinates ? `${coordinates.lat},${coordinates.lon}` : 'unknown'
      }));

      const recommendations = await getWorkScheduleRecommendations(
        openAIKey,
        weatherSummary
      );
      setSchedule(recommendations);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSchedule(null);
    } finally {
      setIsLoading(false);
    }
  }, [forecast, openAIKey, coordinates]);

  useEffect(() => {
    generateSchedule();
  }, [generateSchedule]);

  return { schedule, isLoading, error, refreshSchedule: generateSchedule };
}