import { useSettingsStore } from '../store/useSettingsStore';

export async function fetchWeatherData(lat: number, lon: number, apiKey: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  return response.json();
}

export async function fetchForecastData(lat: number, lon: number, apiKey: string) {
  // Use standard 5-day forecast endpoint (3-hour intervals)
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  return response.json();
}

export function getWeatherIcon(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export function formatWindDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

// Helper function to aggregate 3-hour forecasts into daily forecasts
export function aggregateDailyForecasts(forecastList: any[]) {
  const dailyForecasts = forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = {
        dt: item.dt,
        temp: {
          day: item.main.temp,
          min: item.main.temp_min,
          max: item.main.temp_max
        },
        humidity: item.main.humidity,
        weather: item.weather,
        wind: {
          speed: item.wind.speed,
          deg: item.wind.deg
        },
        rain: item.rain?.['3h'] || 0,
        samples: 1
      };
    } else {
      acc[date].temp.day += item.main.temp;
      acc[date].temp.min = Math.min(acc[date].temp.min, item.main.temp_min);
      acc[date].temp.max = Math.max(acc[date].temp.max, item.main.temp_max);
      acc[date].humidity += item.main.humidity;
      acc[date].wind.speed += item.wind.speed;
      acc[date].rain += item.rain?.['3h'] || 0;
      acc[date].samples += 1;
    }
    return acc;
  }, {});

  // Calculate averages and format the data
  return Object.values(dailyForecasts).map((day: any) => ({
    ...day,
    temp: {
      day: day.temp.day / day.samples,
      min: day.temp.min,
      max: day.temp.max
    },
    humidity: Math.round(day.humidity / day.samples),
    wind: {
      speed: day.wind.speed / day.samples,
      deg: day.wind.deg
    }
  }));
}