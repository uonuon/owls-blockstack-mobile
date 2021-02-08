import React, {
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import LottieView from 'lottie-react-native';
import {
  Animated,
  Image,
  Pressable,
  View,
} from 'react-native';
import {
  useTheme,
} from 'hooks';
import {
  Assets,
} from 'assets';
import styles from './styles';
import {
  AppTutorialProps,
} from './types';

export const AppTutorial: React.FC<PropsWithChildren<AppTutorialProps>> = (props) => {
  const fadeAnimation = useState(new Animated.Value(0))[0];
  const movementAnimation = useState(new Animated.Value(300))[0];

  const {
    theme: {
      colors,
    },
  } = useTheme();
  const {
    images: {
      common,
    },
  } = Assets;

  const {
    animation,
    onPress,
    children,
  } = props;

  const fadeIn = () => {
    Animated.timing(movementAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);
  return (
    <>
      <View>
        <LottieView
          source={animation}
          autoPlay
          speed={1}
          loop={false}
          style={styles.animationView}
        />
      </View>
      <Animated.View style={[
        styles.textContainer,
        {
          transform: [
            {
              translateY: movementAnimation,
            },
          ],
          opacity: fadeAnimation,

        }]}
      >
        {children}
      </Animated.View>
      <View
        style={styles.bottomNAvigationContainer}
      >
        <Animated.View style={{
          opacity: fadeAnimation,
        }}
        >
          <Pressable
            onPress={onPress}
            style={[
              styles.nextButton,
              {
                backgroundColor: colors.common.white,
                borderColor: colors.borderColor,
              },
            ]}
          >
            <Image
              source={common.chevronRight}
              style={styles.nextButtonIcon}
            />
          </Pressable>
        </Animated.View>
        <View style={styles.AnimatedFooterContainer}>
          <View style={[
            styles.blueStrip,
            {
              backgroundColor: colors.primary,
            },
          ]}
          />
          <View style={[
            styles.greyDot,
            {
              backgroundColor: colors.secondaryBackground,
            },
          ]}
          />
        </View>
      </View>
    </>
  );
};
