import React from 'react';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

const HeroBar = () => {
  const currentWeather = {
    temp: 23,
    feelsLike: 21,
    condition: 'Soleado',
    icon: Sun,
  };

  const hourlyForecast = [
    { hour: '10 AM', icon: Sun, temp: 23 },
    { hour: '11 AM', icon: Cloud, temp: 24 },
    { hour: '12 PM', icon: Sun, temp: 25 },
    { hour: '1 PM', icon: Cloud, temp: 26 },
    { hour: '2 PM', icon: CloudRain, temp: 24 },
    { hour: '3 PM', icon: CloudRain, temp: 22 },
    { hour: '4 PM', icon: Cloud, temp: 21 },
    { hour: '5 PM', icon: Sun, temp: 20 },
  ];

  const userName = 'Patricia';
  const greeting = new Date().getHours() < 12 ? 'Buen día' : new Date().getHours() < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="bg-gradient-to-r from-[#001E21] to-[#003336] rounded-2xl p-6 mb-6 border border-white/10 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-8">
        {/* Weather Section */}
        <div className="flex items-start gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Sun className="w-10 h-10 text-[#00BFA5]" />
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">{currentWeather.temp}°</div>
              <div className="text-sm text-white/60">Sensación {currentWeather.feelsLike}°</div>
              <div className="text-sm text-[#00BFA5] font-medium">{currentWeather.condition}</div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            {hourlyForecast.map((forecast, idx) => {
              const IconComponent = forecast.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs text-white/50 font-medium">{forecast.hour}</span>
                  <IconComponent className="w-5 h-5 text-white/70" />
                  <span className="text-xs text-white/60 font-semibold">{forecast.temp}°</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="flex-1 text-right">
          <h2 className="text-2xl font-bold text-white mb-2">
            {greeting}, {userName}.
          </h2>
          <p className="text-white/60 text-base">
            Aquí tienes lo esencial de tu mañana.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBar;
