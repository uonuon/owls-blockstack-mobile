import { StyleSheet } from "react-native";
import { DefaultTheme } from "themes";

const theme = DefaultTheme;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 16,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.elevation04dp, 
  },
  replyContainer: {
    backgroundColor: theme.colors.elevation04dp,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  more: { width: 15, height: 3 },
  replyContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    color: theme.colors.common.white,
    marginRight: 5,
    fontFamily: theme.fonts.regular,
  },
  username: {
    fontSize: 16,
    color: theme.colors.common.white,
    opacity: 0.38,
    fontFamily: theme.fonts.regular,
  },
  replyImage: {
    width: "100%",
    resizeMode: "cover",
    borderRadius: 16,
    marginTop: 8,
  },
  replyTextContainer: {
    justifyContent: "flex-start",
    width: "92%",
  },
  replyText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.common.white,
  },
  replyFooter: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  hootImage: {
    width: '92%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 16,
    marginTop: 10,
  },
});

export default styles;
