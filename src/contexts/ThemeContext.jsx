
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    // 1. Check localStorage for a saved theme
    const savedTheme = localStorage.getItem('ale_theme');
    if (savedTheme) return savedTheme;

    // 2. If no saved theme, check user's OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // 3. Default to 'light'
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the opposite theme class and add the current one
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);

    // Save the current theme to localStorage
    localStorage.setItem('ale_theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
