const BOGOTA_LATITUDE = 4.711;
const BOGOTA_LONGITUDE = -74.0721;

// WMO weather codes, as returned by Open-Meteo's `current.weather_code`.
const WEATHER_CODE_LABELS = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Dense drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with hail',
};

function describeWeatherCode(code) {
  return WEATHER_CODE_LABELS[code] ?? 'Weather unavailable';
}

export async function fetchBogotaWeather() {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${BOGOTA_LATITUDE}&longitude=${BOGOTA_LONGITUDE}` +
    `&current=temperature_2m,weather_code&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  const temperature = json?.current?.temperature_2m;
  const code = json?.current?.weather_code;

  if (typeof temperature !== 'number') throw new Error('Unexpected weather response shape');

  return {
    temperatureC: Math.round(temperature),
    description: describeWeatherCode(code),
  };
}
