import AsyncStorage from '@react-native-community/async-storage';
import {
  Assets,
} from 'assets';
import {
  AppTutorial,
} from 'components';
import {
  useNavigationUtils,
  useTheme,
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

export const Tutorial2: React.FC = () => {
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
      <AppTutorial
        animation={tutorial.tutorial2}
        onPress={async () => {
          await AsyncStorage.setItem('firstTime', 'true');
          navigation.navigate('login');
        }}
      >
        <Text style={{
          fontFamily: fonts.medium, fontSize: 16, color: colors.primaryText, marginTop: 60,
        }}
        >
          We use
          {' '}
          <Text style={{
            fontFamily: fonts.semiBold, fontSize: 18, color: colors.primary,
          }}
          >
            Blockchain technology
          </Text>
        </Text>
        <Text style={{
          fontFamily: fonts.medium, fontSize: 16, color: colors.primaryText, textAlign: 'center', paddingHorizontal: 16,
        }}
        >
          to empower user privacy and redefine information security.
        </Text>
      </AppTutorial>
    </View>
  );
};
