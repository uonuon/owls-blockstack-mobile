import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: theme.colors.elevation02dp,
  },
  tabViewContainer: {
    flex: 1,
    marginTop: 15,
    borderRadius: 12,
  },
  tabsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabsInnerContainer: {
    borderRadius: 9,
    width: 233,
    height: 32,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 1,
    elevation: 0,
  },
  tab: {
    flex: 1,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    height: 28,
  },
  flatList: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.elevation01dp,
  },
  scene: {
    flex: 1,
  },
});
export default styles;
