import { fonts } from './../../../assets/fonts/index';
import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  backgroundLogo: {
    width: 80,
    height: 17,
    resizeMode: 'cover',
  },
  writeHoot: {
    backgroundColor: '#121212',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: 16,
    margin: 16,
    width: '92%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

elevation: 5,
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 12,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
    resizeMode: 'contain',
  },
  whatHappen: {
    fontSize: 16,
    opacity: 0.38,
    color: '#fff'
  },
  
});

export default styles;
