import { fonts } from './../../../assets/fonts/index';
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
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.colors.elevation01dp,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.elevation24dp,
  },
  backgroundLogo: {
    width: 80,
    height: 17,
    resizeMode: 'cover',
  },
  writeHoot: {
    backgroundColor: theme.colors.elevation04dp,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 16,
    margin: 16,
    width: '92%',
    shadowColor: theme.colors.elevation02dp,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

elevation: 5,
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
    resizeMode: 'contain',
  },
  whatHappen: {
    fontSize: 18,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceDisabled
  },
  fab: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    position: "absolute",
    bottom: 20,
    right: 32,
    height: 56,
    backgroundColor: theme.colors.secondaryLowerContrasted,
    borderRadius: 100,
  },
  plus: { width: 24, height: 24, resizeMode: "contain" }
});

export default styles;
