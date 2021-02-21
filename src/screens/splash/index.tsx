import React,
{
  useContext,
  useEffect,
} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import {
  useLocalization,
  useNavigationUtils,
  useTheme,
} from 'hooks';
import {
  LANGUAGES,
} from 'shared';
import {
  en,
} from 'i18n';
import {
  DefaultTheme,
} from 'themes';
import {
  UserData,
} from 'contexts';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Assets,
} from 'assets';
import RNBlockstackSdk from 'react-native-blockstack';

const {
  screens: {
    splash: {
      backgroundLogo,
      logoSplash,
    },
  },
} = Assets.images;

export const SplashScreen: React.FC = () => {
  const {
    theme,
    setTheme,
  } = useTheme();
  const {
    success,
    failure,
  } = useContext(UserData);
  const {
    replace,
  } = useNavigationUtils();
  const localization = useLocalization();

  const initLocalization = async () => {
    const translations = en;
    localization.setLanguage(
      LANGUAGES[0],
      translations,
    );
  };
  const init = async () => {
    setTheme(DefaultTheme);
    initLocalization();
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('firstTime').then((isFirstTime) => {
    if (success) {
        replace({
          name: 'home',
        },
        {
          name: 'chats',
        });
      } else if (failure) {
        replace({
          name: 'home',
        });
      }
    });
  }, [success, failure]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <View style={{
        marginBottom: 100,
      }}
      >
        <Image
          source={logoSplash}
          style={{
            width: 243,
            height: 45,
            resizeMode: 'cover',
          }}
        />
        <Text style={{
          fontFamily: theme.fonts.regular,
          fontSize: 16,
          marginTop: 10,
          color: theme.colors.primary,
        }}
        >
          NEW ERA OF
          {' '}
          <Text style={{
            fontFamily: theme.fonts.semiBold,
          }}
          >
            COMMUNICATION
          </Text>
          {' '}

        </Text>
        <View style={{
          marginTop: 40,
        }}
        >
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
            style={{
              paddingTop: 20,
            }}
          />
        </View>
      </View>

      <View style={{
        position: 'absolute', bottom: 0, left: 0,
      }}
      >
        <Image
          source={backgroundLogo}
          style={{
            width: 248, height: 246, resizeMode: 'cover',
          }}
        />
      </View>
    </View>
  );
};
