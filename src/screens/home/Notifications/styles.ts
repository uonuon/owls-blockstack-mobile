import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.elevation01dp,
  },
  header: {
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: theme.colors.elevation01dp,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.elevation02dp,
  },
  title: {
    fontSize: 16,
    color: theme.colors.common.white,
    opacity: 0.6,
    fontFamily: theme.fonts.regular,
  },
  backgroundLogo: {
    width: 40,
    height: 40,
    marginRight: 16
  },
});

export default styles;
