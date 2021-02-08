import {
  Assets,
} from 'assets';
import {
  useTheme,
} from 'hooks';
import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import styles from './styles';

interface Props {
  focused: boolean,
}

const {
  screens: {
    login: {
      lock,
      loginAvatar
    }
  },
} = Assets.images;

const TabBarIcon: React.FC<Props> = (props: Props) => {
  const {
    theme: {
      colors,
      fonts,
    },
  } = useTheme();
  const {
    focused,
  } = props;
  return (
    <View
      style={styles.barIconContainer}
    >
      <Image
        style={styles.barIcon}
        source={focused ? lock : loginAvatar}
      />
    </View>
  );
};

export default TabBarIcon;
