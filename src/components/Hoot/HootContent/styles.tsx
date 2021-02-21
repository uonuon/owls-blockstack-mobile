import {
    StyleSheet,
  } from 'react-native';
  import { DefaultTheme } from 'themes';
    
  const theme = DefaultTheme
  
  const styles = StyleSheet.create({
    hootText: {
      fontSize: 17,
      fontFamily: theme.fonts.regular,
      lineHeight: 24,
      color: theme.colors.common.white,
    },
    hootImage: {
      width: '92%',
      resizeMode: 'cover',
      borderRadius: 16,
      marginTop: 8
    },
    hootTextContainer: {
      justifyContent: 'flex-start',
      width: '92%'
    },
  });
  
  export default styles;
  