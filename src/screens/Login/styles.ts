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
    padding: 16,
  },
  backgroundLogo: {
    marginTop: 45,
    resizeMode: 'cover',
    width: 138,
    height: 30,
  },
  logoAvatar: {
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: theme.fonts.headers,
    fontSize: 20,
    textAlign: 'left',
    color: theme.colors.common.white,
  },
  continueButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 32,
    height: 56,
    marginVertical: 20,
    paddingHorizontal: 80
    // width: '100%'
  },
  buttonText: {
    fontFamily: theme.fonts.headers,
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  image: {
    marginRight: 16,
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  containerFooter: {
    backgroundColor: theme.colors.elevation02dp,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 8,
    paddingLeft: 20,
    marginHorizontal: 16
  },
  text: {
    color: theme.colors.onSurfaceDisabled,
    fontSize: 12,
  },
  getIdButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 48,
  },
});

export default styles;
