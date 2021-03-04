import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.elevation01dp,
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
  backgroundLogo: {
    width: 20,
    height: 35,
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
})

export default styles;
