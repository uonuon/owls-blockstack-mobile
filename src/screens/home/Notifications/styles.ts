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
  button: {
    height: 48,
    borderRadius: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    marginVertical: 20,
    width: '80%'
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
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
    width: '80%'
  },
  backgroundLogo: {
    width: 40,
    height: 40,
    marginRight: 16
  },
});

export default styles;
