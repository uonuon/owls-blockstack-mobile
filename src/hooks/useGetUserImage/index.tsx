import {
  IUser,
} from 'shared';
import React,
{
  useMemo,
  useState,
} from 'react';
import {
  View,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {
  useGetUserName,
} from 'utils';
import {
  Assets,
} from 'assets';
import {
  defaultConfig,
} from '../useAuth/types';
import { useNavigationUtils } from '../useNavigationUtils';

const {
  common: {
    blockstackIcon,
    avatar,
  },
} = Assets.images;

export const useNameInitials = (name?: string) => useMemo(() => {
  const hasMoreThanAscii = [...(name || '')].some(
    (char) => char.charCodeAt(0) > 127,
  );
  const joinBy = hasMoreThanAscii ? ' ' : '';
  return (name || '')
    .split(' ')
    .map((a) => a[0])
    .join(joinBy)
    .toUpperCase();
}, [name]);

export const useGetUserImage = (userData: IUser, overrideStyles?: ViewStyle) => {
  const [data, setData] = useState<{uri: string}>(avatar);
  const { navigateTo } = useNavigationUtils();

  useMemo(() => {
    const gaiaURL = userData?.profile && JSON.parse(userData.profile).apps[defaultConfig.appDomain];
    if(userData?.avatar){
      fetch(gaiaURL + userData.avatar, {
        method: 'GET',
      }).then((res) => res.json()).then(res => {
        setData({uri: res})
      });
    }else{
      setData(avatar);
    }
  }, [userData]);

  return (
    <TouchableOpacity
    onPress={() => navigateTo({name: 'UserProfile', params: {incomingUser: userData}})}
    style={{
      width: 60,
      height: 60,
      overflow: 'hidden',
      ...overrideStyles,
    }}
    >
      <Image
        source={data}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      />
    </TouchableOpacity>
  )
};

export const useGetBlockstackIcon = (username: string) => useMemo(() => (username.split('.').length === 2 ? (
  <Image source={blockstackIcon} />
) : (
  <Image source={blockstackIcon} />
)), [username]);
