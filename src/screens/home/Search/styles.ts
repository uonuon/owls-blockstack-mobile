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
    backgroundColor: theme.colors.elevation02dp,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.elevation02dp,
  },
  title: {
    fontSize: 16,
    color: theme.colors.common.white,
    opacity: 0.6,
    fontFamily: theme.fonts.regular,
  },
    backContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backgroundLogo: {
    width: 40,
    height: 40,
    marginRight: 16
  },
  chev: {width: 20, height: 35},
  image: {marginRight: 16, width: 56, height: 56, borderRadius: 28, resizeMode: 'cover', borderWidth: 1, borderColor: theme.colors.common.white},
  name: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.common.white,
    marginRight: 5
  },
  username: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.common.white,
    opacity: 0.38
  },
});

export default styles;
