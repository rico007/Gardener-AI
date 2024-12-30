import { format } from 'date-fns';
import { WeatherSummary } from '../types/agriculture';
import { cropTimings } from './crop-timings';

export function generateAIPrompt(weatherData: WeatherSummary[]) {
  const currentDate = new Date();
  const location = weatherData[0]?.location || 'unknown location';

  return {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an expert home gardening AI assistant. Consider:
- Current date and location
- Weather forecast data
- Optimal planting windows for vegetables and herbs
- Soil temperature requirements
- Proper spacing for small garden beds
- Watering needs based on precipitation forecast

Return exactly 5 vegetables or herbs that are suitable for home gardens in the current season.`
      },
      {
        role: "user",
        content: `Location: ${location}
Current date: ${format(currentDate, 'yyyy-MM-dd')}
Weather forecast: ${JSON.stringify(weatherData)}

Provide a 3-month garden schedule with these requirements:
1. Only recommend vegetables and herbs suitable for home gardens
2. If current time is not ideal, schedule for next suitable window
3. Include soil preparation and companion planting tips
4. Provide exactly 3 actions per crop across 3 months
5. Consider weather patterns for timing recommendations

Return as JSON:
{
  "crops": [{
    "name": string,
    "image": string, // Unsplash image URL for the crop
    "actions": [{
      "date": "YYYY-MM-DD",
      "action": string,
      "reason": string,
      "status": "pending",
      "soilPrep": {
        "temperature": number,
        "preparation": string[]
      },
      "spacing": {
        "between": number,
        "depth": number
      },
      "watering": {
        "frequency": string,
        "amount": string
      }
    }]
  }]
}`
      }
    ]
  };
}