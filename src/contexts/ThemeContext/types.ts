export interface Theme {
  fonts: {
    regular: string,
    medium: string,
    semiBold: string,
    headers: string,
  };
  colors: {
    primary: string,
    primaryLowContrasted: string,
    primaryLowerContrasted: string,
    primaryMediumContrasted: string,
    primaryHighContrasted: string,
    onPrimaryHighEmphasis: string,
    onPrimaryMediumEmphasis: string,
    onPrimaryDisabled: string,

    secondary: string,
    secondaryLowContrasted: string,
    secondaryLowerContrasted: string,
    secondaryMediumContrasted:string,
    secondaryHighContrasted:string,
    onSecondaryHighEmphasis:string,
    onSecondaryMediumEmphasis: string,
    onSecondaryDisabled: string,

    background: string,
    onBackground: string,

    surface:string,
    onSurfaceHighEmphasis: string,
    onSurfaceMediumEmphasis: string,
    onSurfaceDisabled: string,

    error: string,
    onError: string,
    success: string,
    onSuccess: string,

    common: {
      black: string
      white: string
    }

    outline: string,

    elevation01dp: string,
    elevation02dp: string,
    elevation03dp: string,
    elevation04dp: string,
    elevation06dp: string,
    elevation08dp: string,
    elevation12dp: string,
    elevation16dp: string,
    elevation24dp: string,
  };
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
