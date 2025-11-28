import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  Newspaper, TrendingUp, Briefcase, Rocket, GraduationCap,
  DollarSign, Laptop, Volume2, RefreshCw,
  ExternalLink, Bookmark, Share2, Flame, 
  Globe, Eye
} from 'lucide-react';

const News = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isReading, setIsReading] = useState(false);
  const [readingId, setReadingId] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);

  const categories = [
    { id: 'all', label: 'Portada', icon: Newspaper },
    { id: 'tech', label: 'Tecnología', icon: Laptop },
    { id: 'business', label: 'Negocios', icon: Briefcase },
    { id: 'finance', label: 'Mercados', icon: TrendingUp },
    { id: 'innovation', label: 'Innovación', icon: Rocket },
    { id: 'education', label: 'Educación', icon: GraduationCap },
  ];

  // Noticia principal (Hero)
  const heroNews = {
    id: 'hero',
    category: 'tech',
    title: 'OpenAI lanza GPT-5: La nueva era de la Inteligencia Artificial General',
    subtitle: 'El modelo supera todas las expectativas con capacidades multimodales avanzadas y razonamiento autónomo',
    summary: 'En un evento histórico en San Francisco, OpenAI presentó GPT-5, marcando un hito sin precedentes en la inteligencia artificial. El nuevo modelo demuestra capacidades de razonamiento complejo, procesamiento simultáneo de video, audio y texto, además de comprensión contextual profunda que revolucionará industrias completas.',
    author: 'Sarah Chen',
    source: 'TechCrunch',
    time: 'Hace 15 minutos',
    readTime: '8 min',
    priority: 'breaking',
    image: '🤖',
    views: '127K',
    relevance: 98
  };

  const newsArticles = [
    {
      id: 1,
      category: 'finance',
      title: 'Bolsa de Valores: NASDAQ alcanza máximo histórico impulsado por IA',
      summary: 'Las acciones tecnológicas lideran un rally sin precedentes. El índice sube 3.2% en una sola sesión.',
      author: 'Michael Bloomberg',
      source: 'Bloomberg',
      time: 'Hace 1 hora',
      readTime: '5 min',
      priority: 'urgent',
      image: '📈',
      views: '89K',
      relevance: 94
    },
    {
      id: 2,
      category: 'business',
      title: 'Amazon adquiere startup de IA por $2.5 billones en megadeal tecnológico',
      summary: 'La adquisición más grande del año fortalece la posición de Amazon en inteligencia artificial empresarial.',
      author: 'David Pierce',
      source: 'Reuters',
      time: 'Hace 2 horas',
      readTime: '6 min',
      priority: 'high',
      image: '💼',
      views: '76K',
      relevance: 91
    },
    {
      id: 3,
      category: 'innovation',
      title: 'Científicos logran fusión nuclear controlada: energía infinita es real',
      summary: 'Breakthrough revolucionario en laboratorio de MIT promete cambiar el futuro energético del planeta.',
      author: 'Dr. Emma Watson',
      source: 'MIT Technology Review',
      time: 'Hace 3 horas',
      readTime: '12 min',
      priority: 'high',
      image: '⚡',
      views: '142K',
      relevance: 96
    },
    {
      id: 4,
      category: 'tech',
      title: 'Apple Vision Pro 2: La revolución de la realidad mixta ahora más accesible',
      summary: 'Segunda generación del headset llega con mejoras significativas y precio reducido a $1,999.',
      author: 'Nilay Patel',
      source: 'The Verge',
      time: 'Hace 4 horas',
      readTime: '7 min',
      priority: 'medium',
      image: '🥽',
      views: '64K',
      relevance: 87
    },
    {
      id: 5,
      category: 'education',
      title: 'Harvard y MIT ofrecen MBAs gratuitos en línea: democratización total',
      summary: 'Nueva iniciativa revoluciona el acceso a educación de élite con certificados válidos globalmente.',
      author: 'Jessica Williams',
      source: 'EdTech Magazine',
      time: 'Hace 5 horas',
      readTime: '9 min',
      priority: 'medium',
      image: '🎓',
      views: '53K',
      relevance: 84
    },
    {
      id: 6,
      category: 'business',
      title: 'Tesla supera expectativas: acciones suben 15% tras reporte trimestral',
      summary: 'Elon Musk anuncia nuevas plantas de producción en Asia y Europa. Proyecciones optimistas.',
      author: 'Lora Kolodny',
      source: 'CNBC',
      time: 'Hace 6 horas',
      readTime: '5 min',
      priority: 'medium',
      image: '🚗',
      views: '98K',
      relevance: 88
    },
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(item => item.category === activeCategory);

  const getPriorityBadge = (priority) => {
    if (priority === 'breaking') {
      return (
        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 bg-red-600 text-white animate-pulse">
          <Flame className="w-3 h-3" />
          Última Hora
        </span>
      );
    }
    
    const styles = {
      urgent: 'bg-red-500 text-white',
      high: theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-cyan-600 text-white',
      medium: theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-500 text-white',
    };
    
    return (
      <span className={cn('px-2 py-0.5 text-xs font-bold uppercase tracking-wider', styles[priority])}>
        {priority === 'urgent' ? 'Urgente' : priority === 'high' ? 'Importante' : 'Noticia'}
      </span>
    );
  };

  const handleRead = (id) => {
    setReadingId(id);
    setIsReading(true);
    setTimeout(() => {
      setIsReading(false);
      setReadingId(null);
    }, 5000);
  };

  const toggleSave = (id) => {
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn(
      "min-h-screen font-['Georgia',serif]",
      theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'
    )}>
      {/* Masthead - Cabecera estilo periódico */}
      <div className={cn(
        "border-b-4 py-6",
        theme === 'dark' ? 'border-ale-neon' : 'border-black'
      )}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <h1 className={cn(
              "text-6xl md:text-7xl font-bold italic tracking-tight mb-2",
              "font-['Playfair_Display',serif]",
              theme === 'dark' ? 'text-ale-white' : 'text-black'
            )}>
              The L.U.C.I. Times
            </h1>
            <div className={cn(
              "flex items-center justify-center gap-4 text-sm",
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            )}>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Global Edition
              </span>
              <span>|</span>
              <span>{new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>|</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                Actualizar
              </motion.button>
            </div>
          </div>

          {/* Categorías estilo tabs de periódico */}
          <div className={cn(
            "flex items-center justify-center gap-6 text-sm font-semibold uppercase tracking-wider border-t border-b py-3",
            theme === 'dark' ? 'border-ale-glass' : 'border-gray-300'
          )}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "hover:underline transition-all",
                  activeCategory === cat.id
                    ? theme === 'dark' 
                      ? 'text-ale-neon underline' 
                      : 'text-black underline decoration-2'
                    : theme === 'dark'
                      ? 'text-gray-400'
                      : 'text-gray-600'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Hero Article - Noticia Principal */}
        {activeCategory === 'all' && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mb-12 pb-12 border-b-2",
              theme === 'dark' ? 'border-ale-glass' : 'border-gray-300'
            )}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Hero Image */}
              <div className={cn(
                "relative rounded-lg overflow-hidden flex items-center justify-center text-9xl",
                theme === 'dark' ? 'bg-[#1F1F1F]' : 'bg-gray-100'
              )}>
                {heroNews.image}
                <div className="absolute top-4 left-4">
                  {getPriorityBadge(heroNews.priority)}
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold">{heroNews.views}</span>
                </div>
              </div>

              {/* Right Column - Hero Content */}
              <div>
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  theme === 'dark' ? 'text-ale-neon' : 'text-red-600'
                )}>
                  {categories.find(c => c.id === heroNews.category)?.label}
                </span>
                
                <h2 className={cn(
                  "text-4xl md:text-5xl font-bold leading-tight mt-2 mb-4",
                  "font-['Playfair_Display',serif]",
                  theme === 'dark' ? 'text-ale-white' : 'text-black'
                )}>
                  {heroNews.title}
                </h2>
                
                <h3 className={cn(
                  "text-xl font-semibold mb-4",
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                )}>
                  {heroNews.subtitle}
                </h3>
                
                <p className={cn(
                  "text-base leading-relaxed mb-6 font-['Georgia',serif]",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {heroNews.summary}
                </p>

                <div className={cn(
                  "flex items-center gap-4 text-sm mb-6 pb-6 border-b",
                  theme === 'dark' ? 'text-gray-500 border-ale-glass' : 'text-gray-500 border-gray-200'
                )}>
                  <span className="font-semibold">Por {heroNews.author}</span>
                  <span>•</span>
                  <span>{heroNews.time}</span>
                  <span>•</span>
                  <span>{heroNews.readTime} lectura</span>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRead(heroNews.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded font-bold text-sm transition-all",
                      isReading && readingId === heroNews.id
                        ? 'bg-red-600 text-white'
                        : theme === 'dark'
                          ? 'bg-ale-petrol text-ale-white hover:bg-ale-glass'
                          : 'bg-black text-white hover:bg-gray-800'
                    )}
                  >
                    <Volume2 className={cn(
                      "w-4 h-4",
                      isReading && readingId === heroNews.id && "animate-pulse"
                    )} />
                    {isReading && readingId === heroNews.id ? 'Leyendo...' : 'Escuchar Noticia'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSave(heroNews.id)}
                    className={cn(
                      "p-3 rounded transition-all",
                      savedArticles.includes(heroNews.id)
                        ? 'bg-yellow-500 text-white'
                        : theme === 'dark'
                          ? 'bg-[#1F1F1F] text-ale-white hover:bg-ale-petrol'
                          : 'bg-gray-100 text-black hover:bg-gray-200'
                    )}
                  >
                    <Bookmark className={cn(
                      "w-5 h-5",
                      savedArticles.includes(heroNews.id) && "fill-current"
                    )} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "p-3 rounded transition-all",
                      theme === 'dark'
                        ? 'bg-[#1F1F1F] text-ale-white hover:bg-ale-petrol'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    )}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Grid de Noticias Secundarias - Estilo Periódico */}
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "pb-8 border-b",
                  theme === 'dark' ? 'border-ale-glass' : 'border-gray-200'
                )}
              >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    theme === 'dark' ? 'text-ale-neon' : 'text-red-600'
                  )}>
                    {categories.find(c => c.id === item.category)?.label}
                  </span>
                  {getPriorityBadge(item.priority)}
                </div>

                {/* Image/Emoji */}
                <div className={cn(
                  "w-full h-40 rounded mb-4 flex items-center justify-center text-6xl",
                  theme === 'dark' ? 'bg-[#1F1F1F]' : 'bg-gray-50'
                )}>
                  {item.image}
                </div>

                {/* Title */}
                <h3 className={cn(
                  "text-xl font-bold leading-tight mb-3 hover:underline cursor-pointer",
                  "font-['Playfair_Display',serif]",
                  theme === 'dark' ? 'text-ale-white' : 'text-black'
                )}>
                  {item.title}
                </h3>

                {/* Summary */}
                <p className={cn(
                  "text-sm leading-relaxed mb-4 font-['Georgia',serif]",
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                )}>
                  {item.summary}
                </p>

                {/* Meta Info */}
                <div className={cn(
                  "flex items-center gap-2 text-xs mb-4",
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                )}>
                  <span className="font-semibold">{item.author}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRead(item.id)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all",
                      isReading && readingId === item.id
                        ? 'bg-red-600 text-white'
                        : theme === 'dark'
                          ? 'bg-ale-petrol text-ale-white hover:bg-ale-glass'
                          : 'bg-black text-white hover:bg-gray-800'
                    )}
                  >
                    <Volume2 className="w-3 h-3" />
                    {isReading && readingId === item.id ? 'Leyendo' : 'Leer'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSave(item.id)}
                    className={cn(
                      "p-2 transition-all",
                      savedArticles.includes(item.id)
                        ? 'text-yellow-500'
                        : theme === 'dark'
                          ? 'text-gray-500 hover:text-ale-white'
                          : 'text-gray-400 hover:text-black'
                    )}
                  >
                    <Bookmark className={cn(
                      "w-4 h-4",
                      savedArticles.includes(item.id) && "fill-current"
                    )} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "p-2",
                      theme === 'dark'
                        ? 'text-gray-500 hover:text-ale-white'
                        : 'text-gray-400 hover:text-black'
                    )}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default News;
