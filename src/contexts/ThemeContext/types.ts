export interface Theme {
  fonts: {
    regular: string,
    medium: string,
    semiBold: string,
  };
  colors: {
    primary: string;
    primaryText: string;
    primaryBackground: string;
    secondary: string;
    secondaryBackground: string;
    secondaryText: string;
    link: string;
    primaryDisabled: string;
    borderShadow: string;
    borderColor: string;
    common: {
      white: string;
      black: string;
    }
  };
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
