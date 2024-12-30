const OPENWEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const OPENAI_API_BASE = 'https://api.openai.com/v1/chat/completions';

export async function validateOpenWeatherKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${OPENWEATHER_API_BASE}?q=London&appid=${apiKey}`
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function validateOpenAIKey(apiKey: string): Promise<boolean> {
  if (!apiKey) return false;
  
  try {
    const response = await fetch(OPENAI_API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Test' }],
        max_tokens: 1,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      if (error.error?.type === 'invalid_api_key') {
        return false;
      }
    }
    
    return response.ok;
  } catch {
    return false;
  }
}