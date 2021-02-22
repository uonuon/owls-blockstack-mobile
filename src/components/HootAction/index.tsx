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
  TouchableOpacity,
} from 'react-native';
import {
 HootActionsProps,
} from './types';
import styles from './styles';

const {
  components: {
    header: {
      chevronLeftBlack,
    },
  },
} = Assets.images;

export const HootAction: React.FC<HootActionsProps> = (props: HootActionsProps) => {
  const {
    theme: {
      colors,
      fonts,
    },
  } = useTheme();
  const {
    icon,
    counter,
    action
  } = props;
  return (
      <TouchableOpacity  style={styles.container} onPress={action}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.text}>{counter}</Text>
      </TouchableOpacity>
  );
};
