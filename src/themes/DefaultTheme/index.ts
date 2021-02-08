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
    primary: '#236DEB',

    primaryBackground: '#ECF2FA',

    secondary: '#EBF0FF',

    secondaryBackground: '#C1E0FF',

    primaryDisabled: '#9e9e9e',

    primaryText: '#2C3E50',

    secondaryText: '#ffffff',

    link: '#4a90e2',

    borderShadow: '#00000',

    borderColor: '#CADDF0',

    common: {
      white: 'white',
      black: 'black',
    },
  },

};

export default DefaultTheme;
