import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000',
    height: '100%'
  },
  header: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  backContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.6,
    fontFamily: theme.fonts.regular,
  },
  backgroundLogo: {
    width: 20,
    height: 35,
  },
  flatList: {
    width: "100%",
    backgroundColor: theme.colors.common.black,
  },
  replyView: {
    backgroundColor: theme.colors.elevation01dp,
    width: '100%',
    padding: 16,
  },
  postHoot: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginLeft: 'auto',
    marginTop: 5,
  },
  hootText: {
    color: theme.colors.onSecondaryDisabled,
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    fontWeight: "bold",
    opacity: 0.38,
  },
});

export default styles;
