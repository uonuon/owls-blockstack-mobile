import {
  Assets,
} from 'assets';
import {
  AppTutorial,
} from 'components';
import {
  useNavigationUtils, useTheme,
} from 'hooks';
import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';

const {
  Animations: {
    tutorial,
  },
} = Assets;

export const Tutorial1: React.FC = () => {
  const navigation = useNavigationUtils();
  const {
    theme: {
      fonts,
      colors,
    },
  } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <AppTutorial animation={tutorial.tutorial1} onPress={() => navigation.navigate('tutorial2')}>
        <Text style={
          [
            styles.description1,
            {
              fontFamily: fonts.medium,
              color: colors.common.black,

            },
          ]
        }
        >
          Pravica is a
          <Text style={[
            styles.subDescription1,
            {
              fontFamily: fonts.semiBold,
              color: colors.common.black,
            }]}
          >
            {' '}
            Unified
          </Text>
        </Text>
        <Text style={[
          styles.description2,
          {
            fontFamily: fonts.medium,
            color: colors.common.black,
          }]}
        >
          communication platform
        </Text>
      </AppTutorial>
    </View>
  );
};
