import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 26,
  },
  backButtonIcon: {
    marginRight: 15,
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.headers
  },
});

export default styles;
