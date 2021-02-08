import React, {
  PropsWithChildren,
  useState,
} from 'react';
import {
  ThemeContext,
  Theme,
} from 'contexts';
import {
  DefaultTheme,
} from 'themes';

interface Props {
  Theme: Theme;
}

export const ThemeProvider: React.FC<Props> = (props: PropsWithChildren<Props>) => {
  const {
    children,
  } = props;
  const [theme, setTheme] = useState<Theme>(DefaultTheme);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (currentTheme: Theme) => setTheme(currentTheme),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
