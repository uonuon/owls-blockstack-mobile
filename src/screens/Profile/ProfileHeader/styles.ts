import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;
const styles = StyleSheet.create({
  image: {
    marginRight: 8,
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: theme.colors.common.white,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
    marginTop: -10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: theme.colors.common.white,
    marginRight: 5,
    fontFamily: theme.fonts.regular,
    lineHeight: 20,
  },
  username: {
    fontSize: 16,
    color: theme.colors.common.white,
    opacity: 0.38,
    fontFamily: theme.fonts.regular,
    lineHeight: 20,
  },
  buttonStyles: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: "#0FBBEB",
    borderWidth: 1,
  },
  date: {
    fontSize: 12,
    color: theme.colors.common.white,
    lineHeight: 16,
    opacity: 0.6,
    flexShrink: 1,
    fontFamily: theme.fonts.regular,
  },
  header: {
    height: 200,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.elevation01dp,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  followersText: {
    color: theme.colors.secondaryLowContrasted,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  },
  followingText: {
    color: theme.colors.common.white,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
  }
})

export default styles;
