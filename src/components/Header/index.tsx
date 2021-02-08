import {
  Assets,
} from 'assets';
import {
  useTheme,
} from 'hooks';
import React from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {
  HeaderProps,
} from './types';
import styles from './styles';

const {
  components: {
    header: {
      chevronLeftBlack,
    },
  },
} = Assets.images;

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const {
    theme: {
      colors,
      fonts,
    },
  } = useTheme();
  const {
    title,
  } = props;
  return (
    <View
      style={styles.container}
    >
      <Pressable>
        <Image source={chevronLeftBlack} style={styles.backButtonIcon} />
      </Pressable>
      <Text style={[
        styles.headerTitle,
        {
          fontFamily: fonts.medium,
          color: colors.common.black,
        },
      ]}
      >
        {title}
      </Text>
    </View>
  );
};
