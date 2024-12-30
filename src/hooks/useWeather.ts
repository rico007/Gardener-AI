import { useState, useEffect } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { fetchWeatherData, fetchForecastData } from '../utils/weather';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { coordinates, openWeatherKey } = useSettingsStore();

  useEffect(() => {
    async function loadWeather() {
      if (!coordinates || !openWeatherKey) {
        setWeather(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchWeatherData(coordinates.lat, coordinates.lon, openWeatherKey);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadWeather();
  }, [coordinates, openWeatherKey]);

  return { weather, isLoading, error };
}

export function useForecast() {
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { coordinates, openWeatherKey } = useSettingsStore();

  useEffect(() => {
    async function loadForecast() {
      if (!coordinates || !openWeatherKey) {
        setForecast(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchForecastData(coordinates.lat, coordinates.lon, openWeatherKey);
        if (data.cod !== '200' && data.cod !== 200) {
          throw new Error(data.message || 'Failed to fetch forecast');
        }
        setForecast(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setForecast(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadForecast();
  }, [coordinates, openWeatherKey]);

  return { forecast, isLoading, error };
}