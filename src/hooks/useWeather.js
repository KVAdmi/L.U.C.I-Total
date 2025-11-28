import { useState, useEffect } from 'react';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || ''; // Gratuita
const DEFAULT_CITY = 'Mexico City';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);

      // Clima actual
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${OPENWEATHER_API_KEY}`
      );
      
      if (!currentResponse.ok) throw new Error('Error obteniendo clima');
      
      const currentData = await currentResponse.json();

      // Pronóstico 8 horas
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&cnt=8&appid=${OPENWEATHER_API_KEY}`
      );
      
      if (!forecastResponse.ok) throw new Error('Error obteniendo pronóstico');
      
      const forecastData = await forecastResponse.json();

      setWeather({
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        city: currentData.name,
      });

      setForecast(
        forecastData.list.map(item => ({
          time: new Date(item.dt * 1000).getHours() + ':00',
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
        }))
      );

      setLocation({ lat, lon, city: currentData.name });
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.message);
      useMockWeather();
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) throw new Error('Ciudad no encontrada');

      const data = await response.json();
      await fetchWeatherByCoords(data.coord.lat, data.coord.lon);
    } catch (err) {
      console.error('Error fetching weather by city:', err);
      setError(err.message);
      useMockWeather();
    }
  };

  const useMockWeather = () => {
    setWeather({
      temp: 24,
      feels_like: 22,
      description: 'cielo claro',
      icon: '01d',
      humidity: 45,
      wind: 12,
      city: 'Ciudad de México',
    });
    setForecast([
      { time: '12:00', temp: 24, icon: '01d' },
      { time: '15:00', temp: 26, icon: '01d' },
      { time: '18:00', temp: 23, icon: '02n' },
      { time: '21:00', temp: 20, icon: '02n' },
    ]);
    setLocation(null);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocalización no soportada');
      fetchWeatherByCity(DEFAULT_CITY);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        console.warn('Error obteniendo ubicación:', err.message);
        fetchWeatherByCity(DEFAULT_CITY);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  useEffect(() => {
    if (!OPENWEATHER_API_KEY) {
      console.warn('⚠️ OPENWEATHER_API_KEY no configurada - Usando datos mock');
      useMockWeather();
      setLoading(false);
      return;
    }

    // NO pedimos ubicación automáticamente - esperamos que el usuario lo solicite
    // Usamos ciudad por defecto primero
    fetchWeatherByCity(DEFAULT_CITY);
  }, []);

  const refreshWeather = () => {
    if (location) {
      fetchWeatherByCoords(location.lat, location.lon);
    } else {
      getCurrentLocation();
    }
  };

  const requestLocation = () => {
    getCurrentLocation();
  };

  return {
    weather,
    forecast,
    loading,
    error,
    location,
    refreshWeather,
    requestLocation,
    fetchWeatherByCity,
  };
}
