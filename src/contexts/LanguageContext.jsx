
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('ale_language') || 'es';
  });
  
  // Transition state for visual feedback
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLanguage = (langCode) => {
    if (langCode === language) return;
    
    setIsTransitioning(true);
    // Short delay to allow animation start, then switch data
    setTimeout(() => {
      setLanguageState(langCode);
      localStorage.setItem('ale_language', langCode);
      // Clean up animation
      setTimeout(() => setIsTransitioning(false), 300);
    }, 100);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
