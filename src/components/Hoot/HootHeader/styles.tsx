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
      marginBottom: 4,
    },
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
        fontSize: 16,
        color: theme.colors.common.white,
        opacity: 0.38
    },
    more: { width: 15, height: 3},
  });
  
  export default styles;
  