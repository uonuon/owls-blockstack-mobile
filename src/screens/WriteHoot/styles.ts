import { Assets } from 'assets';
import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  header: {
    height: 64,
    justifyContent: 'space-between',
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
  postHoot: {
    backgroundColor: '#004F93',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 16
  },
  hootText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.38
  },
  writeHoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    margin: 24,
    width: '92%',
    shadowColor: "#000",
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 20,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
    resizeMode: 'contain',
  },
  whatHappen: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.38
  },
  footer: {
    width: '100%',
    height: 72,
    borderTopColor: '#121212',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
  }
});

export default styles;
