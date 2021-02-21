import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: { width: 18, marginRight: 12 },
  text: { fontSize: 14, color: theme.colors.common.white, marginRight: 27, fontFamily: theme.fonts.regular, },
});

export default styles;
