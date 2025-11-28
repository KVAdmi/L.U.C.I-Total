import React from 'react';
import { Cloud, Sun, MapPin, RefreshCw, CloudRain, CloudDrizzle, CloudSnow, Wind, Navigation } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

const HeroBar = () => {
  const { weather, forecast, loading, error, location, refreshWeather, requestLocation } = useWeather();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return Sun;
    if (iconCode.startsWith('01')) return Sun;
    if (iconCode.startsWith('02') || iconCode.startsWith('03') || iconCode.startsWith('04')) return Cloud;
    if (iconCode.startsWith('09') || iconCode.startsWith('10')) return CloudRain;
    if (iconCode.startsWith('11')) return CloudDrizzle;
    if (iconCode.startsWith('13')) return CloudSnow;
    if (iconCode.startsWith('50')) return Wind;
    return Cloud;
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-[#003336] to-[#004d52] dark:from-[#002629] dark:to-[#001a1d] rounded-2xl p-6 border border-[#00BFA5]/20 shadow-lg">
        <div className="animate-pulse flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 bg-white/10 rounded w-48"></div>
            <div className="h-4 bg-white/10 rounded w-32"></div>
          </div>
          <div className="h-20 w-20 bg-white/10 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#003336] to-[#004d52] dark:from-[#002629] dark:to-[#001a1d] rounded-2xl p-6 border border-[#00BFA5]/20 shadow-lg">
      {/* Mensaje de advertencia si hay error */}
      {error && (
        <div className="absolute top-2 right-2 z-20">
          <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="text-xs text-yellow-200">
              {error.includes('API Key') ? '⏳ API Key activándose (~2 horas)' : '⚠️ Usando datos de ejemplo'}
            </span>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Saludo y Ubicación */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white dark:text-white/90 mb-2">{greeting()}, Patricia</h1>
          <div className="flex items-center gap-2 text-white/80 dark:text-white/70">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{weather?.city || 'Cargando ubicación...'}</span>
            {location && (
              <button 
                onClick={refreshWeather}
                className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                title="Actualizar clima"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
            
            {/* Botón para solicitar ubicación */}
            {!location && !loading && (
              <button
                onClick={requestLocation}
                className="p-2 rounded-lg bg-[#00BFA5]/20 hover:bg-[#00BFA5]/30 text-[#00BFA5] transition-colors"
                title="Detectar mi ubicación"
              >
                <Navigation className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Clima Actual */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center border border-white/20 dark:border-white/10">
              {weather?.icon ? (
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                  className="w-12 h-12"
                />
              ) : (
                <Sun className="w-8 h-8 text-[#00BFA5]" />
              )}
            </div>
            <div>
              <div className="text-4xl font-bold text-white dark:text-white/90">{weather?.temp || '--'}°</div>
              <div className="text-sm text-white/70 dark:text-white/60 font-medium capitalize">
                {weather?.description || 'Cargando...'}
              </div>
            </div>
          </div>

          {/* Pronóstico 8 horas */}
          {forecast.length > 0 && (
            <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-white/20 dark:border-white/10">
              {forecast.slice(0, 4).map((item, idx) => {
                const Icon = getWeatherIcon(item.icon);
                return (
                  <div key={idx} className="text-center">
                    <div className="text-xs text-white/60 dark:text-white/50 mb-1 font-medium">{item.time}</div>
                    <Icon className="w-5 h-5 text-white/80 dark:text-white/70 mx-auto mb-1" />
                    <div className="text-sm font-bold text-white dark:text-white/90">{item.temp}°</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 text-xs text-white/50 dark:text-white/40">
          ⚠️ Usando datos de ejemplo (API Key no configurada)
        </div>
      )}
    </div>
  );
};

export default HeroBar;
