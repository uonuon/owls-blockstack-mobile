import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  animationView: {
    width: 360,
    height: 360,
    marginTop: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description1: {
    fontSize: 16,
    marginTop: 50,
  },
  subDescription1: {
    fontSize: 20,
  },
  description2: {
    fontSize: 20,
  },
  nextButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNAvigationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  nextButtonIcon: {
    width: 9,
    height: 18,
    resizeMode: 'cover',
  },
  AnimatedFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  blueStrip: {
    width: 33,
    height: 7,
    borderRadius: 4,
    marginRight: 8,
  },
  greyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default styles;
