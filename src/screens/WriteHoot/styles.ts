import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
  const theme = DefaultTheme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.elevation01dp,
  },
  header: {
    height: 64,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.elevation01dp,
  },
  title: {
    fontSize: 16,
    color: theme.colors.common.white,
    fontFamily: theme.fonts.regular,
    opacity: 0.6
  },
  backgroundLogo: {
    width: 12,
    height: 21,
  },
  postHoot: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16
  },
  hootText: {
    color: theme.colors.onSecondaryDisabled,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    fontWeight: 'bold',
    opacity: 0.38
  },
  writeHoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    margin: 24,
    width: '92%',
    shadowColor: theme.colors.common.black,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 20,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
    resizeMode: 'contain',
  },
  icon2: {
    width: 32,
    height: 28,
    opacity: 0.5,
    marginRight: 16,
    resizeMode: 'contain',
  },
  icon3: {
    width: 25,
    height: 32,
    opacity: 0.5,
    marginRight: 16,
    resizeMode: 'contain',
  },
  icon4: {
    width: 21,
    height: 27,
    opacity: 0.5,
    marginRight: 16,
    resizeMode: 'contain',
  },
  privacy: {
    width: 16,
    height: 16,
    marginRight: 16,
    resizeMode: 'contain',
  },
  whatHappen: {
    fontSize: 20,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceDisabled,
  },
  footer: {
    width: '100%',
    height: 72,
    borderTopColor: theme.colors.elevation02dp,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
  }
});

export default styles;
