import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
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
    width: 12,
    height: 21,
  },
});

export default styles;
