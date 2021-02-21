import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
  },
  replyContainer: {
    backgroundColor: '#121212',
    borderRadius: 8,
    padding: 8,
  },
  image: {marginRight: 16, width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'},
  more: { width: 15, height: 3},
  hootContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  hootHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
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
  hootImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
    marginTop: 8
  },
  hootTextContainer: {
    justifyContent: 'flex-start',
    width: '92%'
  },
  hootText: {
    fontSize: 14,
    color: 'white',
  },
  hootFooter: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default styles;
