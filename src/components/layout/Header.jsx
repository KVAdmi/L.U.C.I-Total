
import React from 'react';
import { Search, Sun, Moon, Bell, User, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

const Header = ({ userProfile }) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentLang = languages.find(l => l.code === language) || languages[0];

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const showToast = (title) => {
    toast({
      title: `🚧 ${title}`,
      description: "Funcionalidad en desarrollo",
    });
  };

  return (
    <header className={cn(
      "h-16 flex-shrink-0 border-b px-6 flex items-center justify-between z-40 font-['Questrial'] transition-colors duration-300",
      theme === 'dark'
        ? "bg-ale-black border-ale-glass"
        : "bg-ale-white-bg border-ale-border-light shadow-sm"
    )}>
      
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4",
            theme === 'dark' ? "text-gray-400" : "text-ale-slate"
          )} />
          <input 
            type="text" 
            placeholder={t('common.search') || 'Buscar en todo el sistema...'}
            className={cn(
              "w-full rounded-full pl-11 pr-4 py-2.5 text-sm transition-all focus:outline-none",
              theme === 'dark'
                ? "bg-[#1A1A1A] border border-transparent focus:border-ale-petrol text-ale-white placeholder:text-gray-500"
                : "bg-ale-pearl border border-ale-border-light focus:border-ale-deep-teal text-ale-charcoal placeholder:text-ale-slate/50 focus:shadow-sm"
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        
        <motion.button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2.5 rounded-full transition-colors",
            theme === 'dark'
              ? "text-gray-300 hover:bg-ale-petrol/30 hover:text-ale-neon"
              : "text-ale-slate hover:bg-ale-deep-teal/10 hover:text-ale-deep-teal"
          )}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
        
        <motion.button
          onClick={() => showToast("Notificaciones")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2.5 rounded-full transition-colors relative",
            theme === 'dark'
              ? "text-gray-300 hover:bg-ale-petrol/30 hover:text-ale-neon"
              : "text-ale-slate hover:bg-ale-deep-teal/10 hover:text-ale-deep-teal"
          )}
        >
          <Bell className="w-5 h-5" />
          <div className={cn(
            "absolute top-2 right-2 w-2 h-2 rounded-full",
            theme === 'dark' ? "bg-ale-neon" : "bg-ale-accent-cyan"
          )}></div>
        </motion.button>

        <div className={cn(
          "w-px h-6 mx-2",
          theme === 'dark' ? "bg-ale-glass" : "bg-ale-border-light"
        )} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full transition-all",
              theme === 'dark'
                ? "hover:bg-ale-petrol/30"
                : "hover:bg-ale-deep-teal/10"
            )}>
              <span className="text-lg">{currentLang.flag}</span>
              <span className={cn(
                "text-xs font-bold uppercase hidden sm:block tracking-wide",
                theme === 'dark' ? "text-ale-white" : "text-ale-charcoal"
              )}>{currentLang.code}</span>
              <ChevronDown className={cn(
                "w-4 h-4",
                theme === 'dark' ? "text-gray-400" : "text-ale-slate"
              )} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={cn(
            "w-48 backdrop-blur-md border",
            theme === 'dark'
              ? "bg-ale-black/95 border-ale-glass text-ale-white"
              : "bg-ale-white-bg/95 border-ale-border-light text-ale-charcoal shadow-lg"
          )}>
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "cursor-pointer flex items-center gap-3",
                  theme === 'dark'
                    ? "text-gray-300 focus:bg-ale-petrol focus:text-ale-white"
                    : "text-ale-slate focus:bg-ale-deep-teal/10 focus:text-ale-deep-teal",
                  language === lang.code && (theme === 'dark' 
                    ? "bg-ale-petrol/50 text-ale-white font-medium"
                    : "bg-ale-deep-teal/10 text-ale-deep-teal font-medium")
                )}
              >
                <span>{lang.flag}</span>
                <span className="flex-1">{lang.label}</span>
                {language === lang.code && <Check className={cn(
                  "w-4 h-4",
                  theme === 'dark' ? "text-ale-neon" : "text-ale-accent-cyan"
                )} />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "flex items-center gap-3 pl-1 pr-2 py-1 rounded-full transition-all",
              theme === 'dark'
                ? "hover:bg-ale-petrol/30"
                : "hover:bg-ale-deep-teal/10"
            )}>
              <img
                alt={userProfile?.name}
                class={cn(
                  "w-8 h-8 rounded-full object-cover border-2",
                  theme === 'dark' ? "border-ale-neon" : "border-ale-accent-cyan"
                )}
               src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
              <div className="text-left hidden lg:block">
                <p className={cn(
                  "text-sm font-semibold leading-tight",
                  theme === 'dark' ? "text-ale-white" : "text-ale-charcoal"
                )}>
                  {userProfile?.name}
                </p>
                <p className={cn(
                  "text-xs leading-tight",
                  theme === 'dark' ? "text-gray-400" : "text-ale-slate"
                )}>
                  {userProfile?.type || 'Admin'}
                </p>
              </div>
              <ChevronDown className={cn(
                "w-4 h-4",
                theme === 'dark' ? "text-gray-400" : "text-ale-slate"
              )} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={cn(
            "w-56 backdrop-blur-md border",
            theme === 'dark'
              ? "bg-ale-black/95 border-ale-glass text-ale-white"
              : "bg-ale-white-bg/95 border-ale-border-light text-ale-charcoal shadow-lg"
          )}>
            <DropdownMenuLabel className={theme === 'dark' ? "text-gray-400" : "text-ale-slate"}>
              Mi Cuenta
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={theme === 'dark' ? "bg-ale-glass" : "bg-ale-border-light"} />
            <DropdownMenuItem 
              onClick={() => showToast("Perfil")} 
              className={cn(
                theme === 'dark'
                  ? "text-gray-300 focus:bg-ale-petrol focus:text-ale-white"
                  : "text-ale-slate focus:bg-ale-deep-teal/10 focus:text-ale-deep-teal"
              )}
            >
              <User className="w-4 h-4 mr-2" /> Ver Perfil
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleSignOut} 
              className={cn(
                theme === 'dark'
                  ? "text-gray-300 focus:bg-ale-petrol focus:text-ale-white"
                  : "text-ale-slate focus:bg-ale-deep-teal/10 focus:text-ale-deep-teal"
              )}
            >
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
