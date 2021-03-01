import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.elevation01dp,
  },
})

export default styles;
