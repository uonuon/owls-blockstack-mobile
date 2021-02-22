import { fonts } from "./../../assets/fonts/index";
import { Assets } from "assets";
import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.elevation01dp,
    flex: 1,
  },
  header: {
    height: 64,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.elevation02dp,
  },
  backContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerText: {
    fontFamily: theme.fonts.headers,
    fontSize: 20,
    lineHeight: 24,
    color: theme.colors.common.white,
    marginBottom: 8,
  },
  description: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.common.white,
    lineHeight: 20,
    marginBottom: 8,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
    marginVertical: 24
  },
  textInput: {
    fontSize: 16,
    color: "white",
    fontFamily: theme.fonts.regular,
  },
  input: {
    width: "100%",
    borderRadius: 4,
    height: 56,
    borderWidth: 1,
    borderColor: theme.colors.elevation02dp,
    marginBottom: 8,
    padding: 8
  },
  text: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: theme.colors.common.white
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    marginTop: 32,
    paddingHorizontal: 80,
    borderRadius: 16,
    paddingVertical: 16
  },
  buttonText: {
    fontFamily: theme.fonts.headers,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default styles;
