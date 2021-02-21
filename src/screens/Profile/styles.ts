import {
    StyleSheet,
  } from 'react-native';
  
  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: 'black'
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
    scene: {
        flex: 1,
    },
    image: {marginRight: 16, width: 56, height: 56, borderRadius: 28, resizeMode: 'cover', borderWidth: 1, borderColor: 'white'},
    name: {
      fontSize: 16,
      color: 'white',
      marginRight: 5
    },
    username: {
      fontSize: 16,
      color: 'white',
      opacity: 0.38
    },
    date: {
      fontSize: 12,
      color: '#fff',
      lineHeight: 16,
      opacity: 0.6
    }
  });
  export default styles;
  