import {
  Theme,
} from 'contexts';
import {
  Assets,
} from 'assets';

const {
  fonts: {
    semiBold,
    medium,
    regular,
  },
} = Assets;

export const DefaultTheme: Theme = {
  fonts: {
    medium,
    regular,
    semiBold,
  },
  colors: {
    primary: "rgba(0, 146, 218, 1)",
    primaryLowContrasted: "rgba(59, 0, 224, 1)",
    primaryLowerContrasted: "rgba(0, 0, 214, 1)",
    primaryMediumContrasted: "rgba(95, 6, 238, 1)",
    primaryHighContrasted: "rgba(125, 64, 242, 1)",
    onPrimaryHighEmphasis: "rgba(0, 0, 0, 1)",
    onPrimaryMediumEmphasis: "rgba(0, 0, 0, 1)",
    onPrimaryDisabled: "rgba(0, 0, 0, 1)",

    secondary: 'rgba(0, 173, 234, 1)',
    secondaryLowContrasted: "rgba(0, 159, 231, 1)",
    secondaryLowerContrasted: "rgba(0, 159, 231, 1)",
    secondaryMediumContrasted: "rgba(15, 187, 235, 1)",
    secondaryHighContrasted: "rgba(109, 206, 240, 1)",
    onSecondaryHighEmphasis: "rgba(0, 0, 0, 1)",
    onSecondaryMediumEmphasis: "rgba(0, 0, 0, 1)",
    onSecondaryDisabled: "rgba(0, 0, 0, 1)",

    background: "rgba(18, 18, 18, 1)",
    onBackground: "rgba(255, 255, 255, 1)",

    surface: "rgba(18, 18, 18, 1)",
    onSurfaceHighEmphasis: "rgba(255, 255, 255, 0.8706)",
    onSurfaceMediumEmphasis: "rgba(255, 255, 255, 0.6)",
    onSurfaceDisabled: "rgba(255, 255, 255, 0.3804)",

    error: "rgba(207, 102, 121, 1)",
    onError: "rgba(255, 255, 255, 1)",
    success: "rgba(102, 207, 125, 1)",
    onSuccess: "rgba(255, 255, 255, 1)",



    outline: "rgba(255, 255, 255, 0.1216)",

    elevation01dp: "rgba(18, 18, 18, 1)",
    elevation02dp: "rgba(255, 255, 255, 0.07)",
    elevation03dp: "rgba(255, 255, 255, 0.08)",
    elevation04dp: "rgba(255, 255, 255, 0.09)",
    elevation06dp: "rgba(255, 255, 255, 0.11)",
    elevation08dp: "rgba(255, 255, 255, 0.12)",
    elevation12dp: "rgba(255, 255, 255, 0.14)",
    elevation16dp: "rgba(255, 255, 255, 0.15)",
    elevation24dp: "rgba(255, 255, 255, 0.16)",
  },

};

export default DefaultTheme;
