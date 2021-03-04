import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.elevation01dp,
  },
});

export default styles;
