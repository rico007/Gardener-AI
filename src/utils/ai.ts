import { WeatherSummary } from '../types/agriculture';
import { generateAIPrompt } from './ai-prompt';

export async function getWorkScheduleRecommendations(
  openAIKey: string,
  weatherData: WeatherSummary[]
) {
  if (!openAIKey) {
    throw new Error('OpenAI API key is required');
  }

  const prompt = generateAIPrompt(weatherData);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`
      },
      body: JSON.stringify(prompt)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get recommendations');
    }

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    if (error.message.includes('invalid_api_key')) {
      throw new Error('Invalid OpenAI API key');
    }
    throw error;
  }
}