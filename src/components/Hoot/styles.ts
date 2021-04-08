import {
  StyleSheet,
} from 'react-native';
import { DefaultTheme } from 'themes';
  
const theme = DefaultTheme

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f'
  },
  hootContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  hootFooter: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
    borderRadius: 24,
    marginRight: 16,
  },
  hootImage: {
    width: '92%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 16,
    marginTop: 10,
  },
  text: {
    color: theme.colors.secondaryHighContrasted,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 80,
    marginBottom: -15,
    marginTop: 10
  },
});

export default styles;
