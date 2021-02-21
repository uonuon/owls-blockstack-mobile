import {
    StyleSheet,
  } from 'react-native';
import { DefaultTheme } from 'themes';
  
  const theme = DefaultTheme
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: theme.colors.elevation02dp
    },
    tabViewContainer: {
      flex: 1,
      marginTop: 15,
      borderRadius: 12,
    },
    tabsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabsInnerContainer: {
      borderRadius: 9,
      width: 233,
      height: 32,
      borderWidth: 1,
      justifyContent: 'center',
      paddingHorizontal: 1,
      elevation: 0
    },
    tab: {
      flex: 1,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
      height: 28,
    },
    flatList: {
       flex: 1, width: "100%",
       backgroundColor: theme.colors.elevation01dp
    },
    scene: {
        flex: 1,
    },
    image: {marginRight: 16, width: 56, height: 56, borderRadius: 28, resizeMode: 'cover', borderWidth: 1, borderColor: theme.colors.common.white},
    name: {
      fontSize: 16,
      color: theme.colors.common.white,
      marginRight: 5
    },
    username: {
      fontSize: 16,
      color: theme.colors.common.white,
      opacity: 0.38
    },
    date: {
      fontSize: 12,
      color: theme.colors.common.white,
      lineHeight: 16,
      opacity: 0.6
    }
  });
  export default styles;
  