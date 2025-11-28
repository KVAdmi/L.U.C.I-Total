import React from 'react';
import { Newspaper, TrendingUp, Zap } from 'lucide-react';

const NewsStream = () => {
  const news = [
    {
      id: 1,
      category: 'economía',
      icon: TrendingUp,
      title: 'México crece 1.4% en Q3 según Banxico',
      source: 'El Financiero',
      time: 'Hace 2h',
      color: 'green',
    },
    {
      id: 2,
      category: 'tecnología',
      icon: Zap,
      title: 'Nuevas regulaciones IA 2026',
      source: 'TechCrunch',
      time: 'Hace 4h',
      color: 'blue',
    },
    {
      id: 3,
      category: 'negocios',
      icon: TrendingUp,
      title: 'Tesla anuncia nueva planta en Europa',
      source: 'Bloomberg',
      time: 'Hace 5h',
      color: 'purple',
    },
  ];

  const getCategoryColor = (color) => {
    const colors = {
      green: 'text-green-400 bg-green-500/10 border-green-500/30',
      blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <Newspaper className="w-5 h-5 text-[#00BFA5]" />
        <h3 className="text-lg font-bold text-white">News & Insights</h3>
      </div>

      <div className="space-y-3">
        {news.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#00BFA5]/30 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getCategoryColor(item.color)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white group-hover:text-[#00BFA5] transition-colors mb-1">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 text-center">
        <button className="text-sm font-semibold text-[#00BFA5] hover:text-[#00BFA5]/80 transition-colors">
          Ver más noticias →
        </button>
      </div>
    </div>
  );
};

export default NewsStream;
