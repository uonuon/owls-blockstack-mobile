import {
    StyleSheet,
  } from 'react-native';
  import { DefaultTheme } from 'themes';
    
  const theme = DefaultTheme
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {marginRight: 8, width: 56, height: 56, borderRadius: 28, resizeMode: 'cover', borderWidth: 1, borderColor: theme.colors.common.white},
  name: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.common.white,
    marginRight: 5
  },
  username: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.common.white,
    opacity: 0.38
  },
  accept: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: 10
  },
  cancel: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: theme.colors.error,
    marginRight: 10
  }
  });
  
  export default styles;
  