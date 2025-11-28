import React from 'react';
import { Newspaper, TrendingUp, Zap } from 'lucide-react';

const NewsStream = () => {
  const news = [
    {
      id: 1,
      category: 'ECONOMÍA',
      icon: TrendingUp,
      title: 'México crece 1.4% en Q3 según Banxico',
      source: 'El Financiero',
      time: 'Hace 2h',
    },
    {
      id: 2,
      category: 'TECNOLOGÍA',
      icon: Zap,
      title: 'Nuevas regulaciones IA 2026',
      source: 'TechCrunch',
      time: 'Hace 4h',
    },
    {
      id: 3,
      category: 'NEGOCIOS',
      icon: TrendingUp,
      title: 'Tesla anuncia nueva planta en Europa',
      source: 'Bloomberg',
      time: 'Hace 5h',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0D1B1E] backdrop-blur-xl rounded-xl p-6 border border-slate-200 dark:border-[#1a3a3f] mb-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-[#00BFA5]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">News & Insights</h3>
      </div>

      <div className="space-y-3">
        {news.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 bg-slate-50 dark:bg-[#151f22] rounded-lg border border-slate-200 dark:border-[#1f3338] hover:border-[#00BFA5]/40 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#0f1a1d] border border-slate-200 dark:border-[#1a3035] flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-[#00BFA5]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wider">{item.category}</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#00BFA5] transition-colors mb-1">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
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

      <div className="mt-5 pt-4 border-t border-slate-200 dark:border-[#1a3035] text-center">
        <button className="text-sm font-semibold text-[#00BFA5] hover:text-[#00BFA5]/80 transition-colors">
          Ver más noticias →
        </button>
      </div>
    </div>
  );
};

export default NewsStream;
