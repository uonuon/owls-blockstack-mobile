import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.6
  },
  backgroundLogo: {
    width: 40,
    height: 40,
    marginRight: 16
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
});

export default styles;
