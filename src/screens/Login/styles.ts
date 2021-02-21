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
    marginTop: '-10%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%'
  
  },
  heading: {
    fontFamily: Assets.fonts.regular,
    fontSize: 20,
    textAlign: 'left',
    marginTop: '-5%',
    color: theme.colors.primary,
  },
  desc: {
    fontFamily: Assets.fonts.regular,
    fontSize: 12,
    opacity: 0.6,
    marginTop: 8,
    color: theme.colors.common.white,
  },
  continueButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primaryMediumContrasted,
    borderRadius: 16,
    height: 48,
    width: '100%'
  },
  buttonText: {
    fontFamily: Assets.fonts.semiBold,
    fontSize: 14,
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
    marginTop: 16,
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
