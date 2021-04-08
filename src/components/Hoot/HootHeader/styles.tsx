import {
    StyleSheet,
  } from 'react-native';
  import { DefaultTheme } from 'themes';
    
  const theme = DefaultTheme
  
  const styles = StyleSheet.create({
    hootHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    },
    name: {
      fontSize: 16,
      color: theme.colors.common.white,
      marginRight: 5,
      fontFamily: theme.fonts.regular,
    },
    username: {
      fontSize: 14,
      color: theme.colors.common.white,
      opacity: 0.38,
      fontFamily: theme.fonts.regular,
    },
    date: {
        fontSize: 12,
        color: theme.colors.common.white,
        opacity: 0.38,
        fontFamily: theme.fonts.regular,
    },
    more: { width: 15, height: 3},
  });
  
  export default styles;
  