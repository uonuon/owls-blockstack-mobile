import React,
{
  useContext,
  useEffect,
} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {
  Assets,
} from 'assets';
import {
  useLocalization,
  useNavigationUtils,
  useTheme,
} from 'hooks';
import {
  UserData,
} from 'contexts';
import styles from './styles';

const {
  screens: {
    login: {
      logo,
      loginAvatar,
      logoMark,
      lock
    },
  },
} = Assets.images;
export const LoginScreen: React.FC = () => {
  const {
    theme,
  } = useTheme();
  const {
    translate,
  } = useLocalization();
  const {
    replace,
  } = useNavigationUtils();

  const {
    success,
    failure,
    signIn,
  } = useContext(UserData);

  const onPressContinue = () => {
    signIn();
  };

  useEffect(() => {
    if (success) {
      replace({
        name: 'home',
      },
      {
        name: 'chats',
      });
    }
  }, [success, failure]);

  const onPressGetId = () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.backgroundLogo} />
      <Image source={loginAvatar} style={styles.logoAvatar} />
     <View style={styles.textContainer}>
     <Text style={[styles.heading]}
          >
            One click sign in to Tikis if you have universal login by Stacks.
          </Text>
          <Text style={styles.desc}
          >
          Stacks ID provides user-controlled login and storage that enable you to take back control of your identity and data.
          </Text>
     </View>

        <Pressable
          onPress={onPressGetId}
          style={[styles.continueButton, {
          }]}
        >
          <Image source={logoMark} style={styles.image} />
          <Text style={[styles.buttonText, {
            color: theme.colors.common.white, borderColor: theme.colors.primary,
          }]}
          >
            Sign in with Blockstack
          </Text>
        </Pressable>
        <View style={styles.containerFooter}>
        <Image source={lock} style={styles.image} />
          <Text style={styles.text}>
          You'll get a Secret Key that automatically encrypts everything you do
          </Text>
        </View>
    </View>
  );
};
