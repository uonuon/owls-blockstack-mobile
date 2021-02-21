import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  barIconContainer: {
    width: 50,
    height: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barIcon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  barIconText: {
    fontSize: 10,
    fontFamily: theme.fonts.regular,
  },
});

export default styles;
