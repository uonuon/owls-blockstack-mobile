import {
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
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
import { Hoot } from 'components';
import {
  ScreenParams,
} from 'navigation';
import TabBarIcon  from '../TabBarIcon';
const {
  common: {
    gif,
    mic,
    photo,
    stats
  },
  components: {
    hoot: {
      avatar,
    }
  },
  screens: {
    home: {
      home,
      homeDisabled
    },
    login: {
      logo,
    }
  },
} = Assets.images;
export const NewsFeed: React.FC<BottomTabScreenProps<ScreenParams>> = () => {
  const {
    theme,
  } = useTheme();
  const {
    translate,
  } = useLocalization();
  const {
    replace,
  } = useNavigationUtils();
  const navigation = useNavigationUtils();

  const {
    success,
    failure,
    signIn,
  } = useContext(UserData);

  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      tabBarIcon: ({
        focused,
      }: { focused: boolean }) =>   <Image
      style={{width: 16, height: 18}}
      source={focused ? home : homeDisabled}
    />
    });
  }, []);
  const {
    navigateTo
  } = useNavigationUtils();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.backgroundLogo} />
      </View>
      <Pressable onPress={() => navigateTo({name: 'WriteHoot'})} style={styles.writeHoot}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={avatar} style={styles.avatar}/>
        <Text style={styles.whatHappen}>What’s happening?</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}> 
          <Image source={photo} style={styles.icon}/>
          <Image source={gif} style={styles.icon}/>
          <Image source={stats} style={styles.icon}/>
          <Image source={mic} style={[styles.icon, {marginRight: 0}]}/>
        </View>
      </Pressable>
      <Hoot />
      <Hoot image={true}/>
      <Hoot />

    </View>
  );
};
