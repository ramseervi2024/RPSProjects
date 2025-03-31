import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme, industrialTheme } from '../theme/colors';


type Theme = typeof lightTheme;
type ThemeName = 'light' | 'dark' | 'industrial';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeName: 'light',
  setThemeName: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  industrial: industrialTheme,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  const value = {
    theme: themes[themeName],
    themeName,
    setThemeName,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}