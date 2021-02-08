import React from 'react';
import {
  DefaultTheme,
} from 'themes';
import {
  ThemeContextType,
} from './types';

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: DefaultTheme,
  setTheme: () => null,
});

export * from './types';
